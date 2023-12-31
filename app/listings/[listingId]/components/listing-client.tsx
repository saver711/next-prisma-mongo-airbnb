"use client"

import axios from "axios"
import { differenceInDays, eachDayOfInterval } from "date-fns"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Range } from "react-date-range"
import { toast } from "react-hot-toast"

import { Container } from "@/app/components/container"
import { ListingHead } from "@/app/components/listings/listing-head"
import { ListingInfo } from "@/app/components/listings/listing-info"
import ListingReservation from "@/app/components/listings/listing-reservation"
import { useLoginModal } from "@/app/hooks/use-login-modal"
import { categories } from "@/app/static/categories"
import { SafeListing, SafeReservation, SafeUser } from "@/app/types"
import { Reservation, User } from "@prisma/client"
import { timezoneDate } from "@/app/helpers/timezone-date"

export const initialDateRange = {
  startDate: timezoneDate(new Date()),
  endDate: timezoneDate(new Date()),
  key: "selection",
}

type ListingClientProps = {
  reservations?: Reservation[]
  listing: SafeListing & {
    user: SafeUser
  }
  currentUser?: User | null
}

export const ListingClient = ({
  listing,
  reservations = [],
  currentUser,
}: ListingClientProps) => {
  const loginModalOnOpen = useLoginModal((state) => state.onOpen)
  const router = useRouter()

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: timezoneDate(reservation.startDate),
        end: timezoneDate(reservation.endDate),
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category)
  }, [listing.category])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModalOnOpen()
    }
    setIsLoading(true)

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!")
        setDateRange(initialDateRange)
        router.push("/trips")
        // router.refresh()
      })
      .catch(() => {
        toast.error("Something went wrong.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [
    totalPrice,
    dateRange,
    listing?.id,
    router,
    currentUser,
    loginModalOnOpen,
  ])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      // const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate)
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate)

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

"use client"

import useCountries from "@/app/hooks/use-countries"
import Image from "next/image"
import { Heading } from "../heading"
import { HeartButton } from "../heart-button"
import { User } from "@prisma/client"

interface ListingHeadProps {
  title: string
  locationValue: string
  imageSrc: string
  id: string
  currentUser?: User | null
}

export const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries()

  const location = getByValue(locationValue)

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}
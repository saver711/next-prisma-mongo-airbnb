import { EmptyState } from "@/app/components/empty-state"
import { getCurrentUser } from "@/app/services/get-current-user"
import { getListingById } from "@/app/services/get-listing-by-id"
import { getReservations } from "@/app/services/get-reservations"
import { ListingClient } from "./components/listing-client"
import { getAllListings, getListings } from "@/app/services/get-listings"
import {Metadata} from "next/types"
type IParams = {
  listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return (
        <EmptyState />
    )
  }

  return (
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
  )
}

export default ListingPage

export const generateStaticParams = async () => {
  const listings = await getAllListings()
  const params = listings.map(listing => ({listingId: listing.id}))  
  return params
}

export const generateMetadata = async ({
  params,
}: {
  params: IParams
}): Promise<Metadata> => {
  const listing = await getListingById(params)
  if (!listing) return {title: "Listing couldn't be found"}
  const {title} = listing
  return { title }
}
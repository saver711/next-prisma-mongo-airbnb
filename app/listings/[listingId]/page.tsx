import { EmptyState } from "@/app/components/empty-state"
import { getCurrentUser } from "@/app/services/get-current-user"
import { getListingById } from "@/app/services/get-listing-by-id"
import { getReservations } from "@/app/services/get-reservations"
import { ListingClient } from "./components/listing-client"

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

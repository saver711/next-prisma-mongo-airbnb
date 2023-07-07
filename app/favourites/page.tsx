import { EmptyState } from "../components/empty-state"
import { getCurrentUser } from "../services/get-current-user"
import { getFavoriteListings } from "../services/get-favourite-listings"
import { FavoritesClient } from "./components/favourites-client"


const ListingPage = async () => {
  const currentUser = await getCurrentUser()
   if (!currentUser) {
     return <EmptyState title="Unauthorized" subtitle="Please login" />
   }
  
  const listings = await getFavoriteListings()
  if (listings.length === 0) {
    return (
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
    )
  }

  return (
      <FavoritesClient listings={listings} currentUser={currentUser} />
  )
}

export default ListingPage

import { prismadb } from "../libs/prismadb"
import { getCurrentUser } from "./get-current-user"

export const getFavoriteListings = async()=>{
    const currentUser = await getCurrentUser()
    const listings = await prismadb.listing.findMany({
        where:{
            id:{in: currentUser?.favoriteIds}
        }
    })

    return listings
}
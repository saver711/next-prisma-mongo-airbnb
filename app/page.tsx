import { Container } from "./components/container"
import { EmptyState } from "./components/empty-state"
import { ListingCard } from "./components/listings/listing-card"
import { getCurrentUser } from "./services/get-current-user"
import { getListings } from "./services/get-listings"

export const dynamic = "force-dynamic"

type HomeProps = {
  searchParams: IListingsParams
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  const hasParams = !!Object.keys(searchParams).length

  if (listings.length === 0) {
    return (
      <EmptyState
        showReset={hasParams}
        showRent={!hasParams}
        title={!hasParams ? "No Listings" : "No exact matches"}
        subtitle={
          !hasParams
            ? "try add some"
            : "Try changing or removing some of your filters."
        }
      />
    )
  }

  return (
    <>
      <Container>
        <div
          className="
            pt-14
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </>
  )
}

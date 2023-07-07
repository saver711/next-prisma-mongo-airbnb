import { Metadata } from "next"
import { EmptyState } from "../components/empty-state"
import { getCurrentUser } from "../services/get-current-user"
import { getReservations } from "../services/get-reservations"
import { ReservationsClient } from "./components/reservations-client"

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

//   all reservations on my airbnbs
  const reservations = await getReservations({ authorId: currentUser.id })

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found."
        subtitle="Looks like you have no reservations on your properties."
      />
    )
  }
return (
  <ReservationsClient reservations={reservations} currentUser={currentUser} />
)
}

export default ReservationsPage

export const metadata: Metadata = {
  title: "My Reservations",
  description: "all of my reservations are here",
}

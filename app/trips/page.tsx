import { Metadata } from "next"
import { EmptyState } from "../components/empty-state"
import { getCurrentUser } from "../services/get-current-user"
import { getReservations } from "../services/get-reservations"
import { TripsClient } from "./components/trips-client"

const TripsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
        <EmptyState title="Unauthorized" subtitle="Please login" />
    )
  }

  const reservations = await getReservations({ userId: currentUser.id })

  if (reservations.length === 0) {
    return (
        <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserved any trips."
        />
    )
  }

  return (
      <TripsClient reservations={reservations} currentUser={currentUser} />
  )
}

export default TripsPage

export const metadata:Metadata = {
  title: "My Trips",
  description: "all of my trips are here"
}
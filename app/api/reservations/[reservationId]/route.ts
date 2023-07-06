import { prismadb } from "@/app/libs/prismadb"
import { getCurrentUser } from "@/app/services/get-current-user"
import { SafeReservation } from "@/app/types"
import { Reservation } from "@prisma/client"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params: { reservationId } }: { params: { reservationId: string } }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.error()

  await prismadb.reservation.deleteMany({
    where: {
      id: reservationId,
      // Only the creator of the reservation or the listing creator
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  })

  return NextResponse.json({ message: "Deleted Successfully" })
}

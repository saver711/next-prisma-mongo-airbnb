import { prismadb } from "@/app/libs/prismadb"
import { getCurrentUser } from "@/app/services/get-current-user"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()

  //  maybe if(!currentUser)

  const reservationData = await req.json()

  const { listingId, ...rest } = reservationData

  //   maybe check ⬆️⬆️

  const listingAndReservation = await prismadb.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser?.id,
          ...rest,
        },
      },
    },
  })

  return NextResponse.json(listingAndReservation)
}

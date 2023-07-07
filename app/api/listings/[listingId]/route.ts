import { prismadb } from "@/app/libs/prismadb"
import { getCurrentUser } from "@/app/services/get-current-user"
import { NextResponse } from "next/server"


interface IParams {
  listingId?: string
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID")
  }

  const listing = await prismadb.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  })

  return NextResponse.json(listing)
}

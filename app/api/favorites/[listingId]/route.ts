import { prismadb } from "@/app/libs/prismadb"
import { getCurrentUser } from "@/app/services/get-current-user"
import { NextResponse } from "next/server"
export async function POST(
  req: Request,
  { params }: { params: { listingId?: string } }
) {
  const currentUser = await getCurrentUser()

  const { listingId } = params

  if (!listingId || typeof listingId !== "string") throw new Error("Invalid ID")

  const favoriteIds = [...(currentUser?.favoriteIds || [])]

  favoriteIds.push(listingId)

  const user = await prismadb.user.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      favoriteIds,
    },
  })
  return NextResponse.json(user)
}
export async function DELETE(
  req: Request,
  { params }: { params: { listingId?: string } }
) {
  const currentUser = await getCurrentUser()

  const { listingId } = params

  if (!listingId || typeof listingId !== "string") throw new Error("Invalid ID")

  const favoriteIds = [...(currentUser?.favoriteIds || [])].filter((id) => id !== listingId)


  const user = await prismadb.user.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      favoriteIds,
    },
  })
  return NextResponse.json(user)
}

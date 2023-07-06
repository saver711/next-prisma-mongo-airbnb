
import { prismadb } from "@/app/libs/prismadb"
import { getCurrentUser } from "@/app/services/get-current-user"
import { NextResponse } from "next/server"
export async function POST(req: Request) {
  const currUser = await getCurrentUser()
  const data = await req.json()

  //  maybe if(!currentUser)

  const { location, ...rest } = data

  //   maybe check ⬆️⬆️

  const listing = await prismadb.listing.create({
    data: {
      ...rest,
      locationValue: location.value,
      price: +rest.price,
      userId: currUser?.id,
    },
  })

  return NextResponse.json(listing)
}
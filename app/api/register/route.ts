import { prismadb } from "@/app/libs/prismadb"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { email, name, password } = body
  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prismadb.user.create({
    data: {
      email,
      name,
      // STORE hashed password in the db
      hashedPassword,
    },
  })

  //@ts-ignore
  delete user.hashedPassword
  return NextResponse.json(user)
}

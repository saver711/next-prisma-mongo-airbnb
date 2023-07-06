import { getServerSession } from "next-auth"
import { authOptions } from "../libs/auth"
import { prismadb } from "../libs/prismadb"

export const getSession = async () => {
  return await getServerSession(authOptions)
}

export const getCurrentUser = async () => {
  try {
    const session = await getSession()
    if (!session) return null

    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user?.email as string,
      },
    })
    if (!currentUser) return null

    return currentUser
  } catch {}
}

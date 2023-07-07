import { prismadb } from "../libs/prismadb"
import { timezoneDate } from "../helpers/timezone-date"

interface IParams {
  listingId?: string
  userId?: string
  authorId?: string
}

export const getReservations = async (params: IParams) => {
  try {
    const { listingId, userId, authorId } = params

    const query: any = {}

    if (listingId) {
      query.listingId = listingId
    }

    if (userId) {
      query.userId = userId
    }

    if (authorId) {
      query.listing = { userId: authorId }
    }

    const reservations = await prismadb.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })


    const safeReservations = reservations.map((reservation) => {
      return {
        ...reservation,
        // المفروض اعمل كدا مع كل التواريخ ال جايه من الداتا بيز
        createdAt: timezoneDate(reservation.createdAt),
        startDate: timezoneDate(reservation.startDate),
        endDate: timezoneDate(reservation.endDate),
        listing: {
          ...reservation.listing,
          createdAt: timezoneDate(reservation.listing.createdAt),
        },
      }
    })

    return safeReservations
  } catch (error: any) {
    throw new Error(error)
  }
}

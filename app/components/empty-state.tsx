"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useLoginModal } from "../hooks/use-login-modal"
import { useRentModal } from "../hooks/use-rent-modal"
import { Button } from "./button"
import { Heading } from "./heading"

interface EmptyStateProps {
  title?: string
  subtitle?: string
  showReset?: boolean
  showRent?: boolean
}

export const EmptyState = async ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
  showRent,
}: EmptyStateProps) => {
  const router = useRouter()
  const rentModalOnOpen = useRentModal((state) => state.onOpen)
  const loginModalOnOpen = useLoginModal((state) => state.onOpen)

  const session = useSession()

  return (
    <div
      className="
      pt-14
        flex 
        flex-col 
        gap-2 
        items-center 
      "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
        {showRent && (
          <Button
            // outline
            label="Add Listing"
            onClick={
              session.status === "unauthenticated"
                ? loginModalOnOpen
                : rentModalOnOpen
            }
          />
        )}
      </div>
    </div>
  )
}

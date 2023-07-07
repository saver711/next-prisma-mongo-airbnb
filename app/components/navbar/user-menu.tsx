"use client"
import { AiOutlineMenu } from "react-icons/ai"
import { Avatar } from "../avatar"
import { useRef, useState } from "react"
import MenuItem from "./menu-item"
import { useRouter } from "next/navigation"
import { useRegisterModal } from "@/app/hooks/use-register-modal"
import { useClickOutside } from "@/app/hooks/use-click-outside"
import { useLoginModal } from "@/app/hooks/use-login-modal"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import { useRentModal } from "@/app/hooks/use-rent-modal"

type UserMenuProps = {
  currentUser?: User | null
}

export const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const onOpen = useRegisterModal((state) => state.onOpen)
  const loginOnOpen = useLoginModal((state) => state.onOpen)
  const { onOpen: rentModalOnOpen } = useRentModal(({ onOpen }) => ({
    onOpen,
  }))
  const openHandler = () => setIsOpen(true)

  const ref = useRef(null)
  useClickOutside(ref, () => setIsOpen(false))

  const onRent = () => {
    if (!currentUser) {
      return loginOnOpen()
    }
    rentModalOnOpen()
  }

  return (
    <div className="flex flex-row items-center gap-3">
      <div
        onClick={onRent}
        className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
      >
        Airbnb your home
      </div>
      <div className="relative" ref={ref}>
        <div
          onClick={openHandler}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />

          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
        {isOpen && (
          <div
            className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-60
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
          >
            <div className="flex flex-col cursor-pointer">
              {currentUser ? (
                <>
                  <MenuItem
                    label="My trips"
                    onClick={() => router.push("/trips")}
                  />
                  <MenuItem
                    label="My favorites"
                    onClick={() => router.push("/favourites")}
                  />
                  <MenuItem
                    label="My reservations"
                    onClick={() => router.push("/reservations")}
                  />
                  <MenuItem
                    label="My properties"
                    onClick={() => router.push("/properties")}
                  />
                  <MenuItem label="Airbnb your home" onClick={rentModalOnOpen} />
                  <hr />
                  <MenuItem label="Logout" onClick={() => signOut()} />
                </>
              ) : (
                <>
                  <MenuItem label="Login" onClick={loginOnOpen} />
                  <MenuItem label="Sign up" onClick={onOpen} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

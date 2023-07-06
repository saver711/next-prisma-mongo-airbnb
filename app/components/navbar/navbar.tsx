import { User } from "@prisma/client"
import { Container } from "../container"
import { Logo } from "./logo"
import { Search } from "./search"
import { UserMenu } from "./user-menu"
import { Categories } from "./categories"

type NavbarProps = {
  currentUser?: User | null
}

export const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <nav className="fixed w-full z-10 shadow-sm p-5 bg-white">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
          >
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>

      <Categories />
    </nav>
  )
}

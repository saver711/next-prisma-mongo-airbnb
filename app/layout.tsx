import { Nunito } from "next/font/google"
import { LoginModal } from "./components/modals/login-modal"
import { RegisterModal } from "./components/modals/register-modal"
import { RentModal } from "./components/modals/rent-modal"
import { Navbar } from "./components/navbar/navbar"
import "./globals.css"
import { AuthSessionProvider } from "./providers/auth-session-provider"
import { ToasterProvider } from "./providers/toaster-provider"
import { getCurrentUser } from "./services/get-current-user"
import { SearchModal } from "./components/modals/search-modal"

const inter = Nunito({ subsets: ["latin"] })

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSessionProvider>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
          <main className="pb-20 pt-56">{children}</main>
        </AuthSessionProvider>
      </body>
    </html>
  )
}

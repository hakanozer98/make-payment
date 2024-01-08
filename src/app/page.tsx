import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default function Home() {
  const { userId } = auth()
  if (userId) {
    redirect("/dashboard")
  }
  return (
    <main>
      <h1>Home Page</h1>
    </main>
  )
}


"use client"
 
import { signIn } from "next-auth/react"
 
export function GoogleAuthButton() {
  return (
    <button onClick={() => signIn("google")} className="px-4 py-2 bg-white text-black border rounded hover:bg-gray-100">
      Auth with Google
    </button>
  )
}

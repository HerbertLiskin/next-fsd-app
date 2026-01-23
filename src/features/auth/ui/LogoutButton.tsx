"use client"
 
import { signOut } from "next-auth/react"
 
export function LogoutButton() {
  return (
    <button 
      onClick={() => signOut()} 
      className="px-3 py-1 text-sm bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded border border-red-500/20 transition-colors"
    >
      Sign Out
    </button>
  )
}

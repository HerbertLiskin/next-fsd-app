'use client'

import { signOut } from 'next-auth/react'

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="rounded border border-red-500/20 bg-red-500/10 px-3 py-1 text-sm text-red-500 transition-colors hover:bg-red-500/20"
    >
      Sign Out
    </button>
  )
}

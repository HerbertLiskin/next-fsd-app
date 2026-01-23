'use client'

import { signIn } from 'next-auth/react'

export function GoogleAuthButton() {
  return (
    <button
      onClick={() => signIn('google')}
      className="rounded border bg-white px-4 py-2 text-black hover:bg-gray-100"
    >
      Auth with Google
    </button>
  )
}

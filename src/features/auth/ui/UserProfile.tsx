
import { auth } from "@/server/auth"
import Image from "next/image"
import { LogoutButton } from "./LogoutButton"
 
export async function UserProfile() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <div className="p-4 border rounded-lg bg-white/5 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || "User Image"}
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
        <div>
          <p className="font-semibold">{session.user.name}</p>
          <p className="text-sm text-gray-400">{session.user.email}</p>
          <p className="text-xs text-gray-500 font-mono">{session.user.id}</p>
        </div>
      </div>
      <LogoutButton />
    </div>
  )
}

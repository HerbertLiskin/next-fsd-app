import { auth } from "@/server/auth";
import Image from "next/image";
import { LogoutButton } from "./LogoutButton";
import { SmartWalletSection } from "../../wallet/ui/SmartWalletSection";
import { DeployedWalletsList } from "../../wallet/ui/DeployedWalletsList";

export async function UserProfile() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-white/5 p-4">
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
          <p className="font-mono text-xs text-gray-500">{session.user.id}</p>
        </div>
      </div>

      <div className="border-t pt-4 border-gray-700 space-y-4">
        <DeployedWalletsList userId={session.user.id} />
        <SmartWalletSection userId={session.user.id} />
      </div>

      <LogoutButton />
    </div>
  );
}

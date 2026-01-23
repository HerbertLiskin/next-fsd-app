// import { Counter } from "@features/counter";
// import { WalletBalance } from "@features/wallet";
import { AuthWidget } from '../features/auth/ui/AuthWidget'
import { GoogleAuthButton } from '../features/auth/ui/GoogleAuthButton'
import { UserProfile } from '../features/auth/ui/UserProfile'
// import { ProfileForm } from "../features/profile/ui/ProfileForm";

import { auth } from '@/server/auth'

export default async function Home() {
  const session = await auth()

  return (
    <main className="bg-brand-tertiary/10 flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 mb-12 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-brand-primary w-full text-center text-4xl font-bold">
          Welcome to Next.js + FSD
        </h1>
      </div>

      <div className="mx-auto mb-12 flex w-full max-w-md flex-col items-center space-y-8">
        <div className="flex w-full flex-col items-center gap-4">
          <AuthWidget />
          {!session && <GoogleAuthButton />}
        </div>
        <UserProfile />
        {/* <ProfileForm />
        <div className="border-t pt-8">
            <h3 className="text-xl font-bold mb-4 text-center">Legacy Counters</h3>
            <WalletBalance />
            <Counter />
        </div> */}
      </div>

      <div className="mt-12 mb-32 grid gap-8 text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/30">
          <h2 className={`text-brand-secondary mb-3 text-2xl font-semibold`}>
            Feature Sliced Design
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Architectural methodology for frontend projects.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/30">
          <h2 className={`text-brand-secondary mb-3 text-2xl font-semibold`}>
            React Query
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Powerful asynchronous state management.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/30">
          <h2 className={`text-brand-secondary mb-3 text-2xl font-semibold`}>
            Tailwind CSS
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Rapidly build modern websites without ever leaving your HTML.
          </p>
        </div>
      </div>
    </main>
  )
}

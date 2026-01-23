import { Counter } from "@features/counter";
import { WalletBalance } from "@features/wallet";
import { AuthWidget } from "../features/auth/ui/AuthWidget";
import { ProfileForm } from "../features/profile/ui/ProfileForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-brand-tertiary/10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-12">
        <h1 className="text-4xl font-bold text-brand-primary text-center w-full">
          Welcome to Next.js + FSD + Effector
        </h1>
      </div>

      <div className="mb-12 w-full max-w-md mx-auto space-y-8">
        <AuthWidget />
        <ProfileForm />
        <div className="border-t pt-8">
            <h3 className="text-xl font-bold mb-4 text-center">Legacy Counters</h3>
            <WalletBalance />
            <Counter />
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left mt-12 gap-8">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold text-brand-secondary`}>
            Feature Sliced Design
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Architectural methodology for frontend projects.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold text-brand-secondary`}>
            React Query
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Powerful asynchronous state management.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/30">
          <h2 className={`mb-3 text-2xl font-semibold text-brand-secondary`}>
            Tailwind CSS
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Rapidly build modern websites without ever leaving your HTML.
          </p>
        </div>
      </div>
    </main>
  );
}

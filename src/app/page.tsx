import { Counter } from "@features/counter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-brand-tertiary/10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-12">
        <h1 className="text-4xl font-bold text-brand-primary text-center w-full">
          Welcome to Next.js + FSD + Effector
        </h1>
      </div>

      <div className="mb-12">
        <Counter />
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
            Effector
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Efficient and powerful state manager.
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

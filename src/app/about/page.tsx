export const dynamic = 'force-static'

export default function About() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-brand-primary mb-6 text-4xl font-bold">About Page</h1>
      <div className="prose prose-lg text-brand-secondary">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p className="mt-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </div>
    </main>
  )
}

import Link from 'next/link'
// import clsx from 'clsx';
// import { ConnectButton, NetworkSelect } from '@features/wallet';

export const Header = () => {
  return (
    <header className="bg-brand-primary flex items-center justify-between p-4 text-white shadow-md">
      <div className="flex items-center gap-8">
        <div className="text-xl font-bold">My App</div>
        <nav className="flex gap-4">
          <Link
            href="/"
            className="hover:text-brand-tertiary transition-colors"
          >
            Main
          </Link>
          <Link
            href="/about"
            className="hover:text-brand-tertiary transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
      {/* <div className="flex items-center gap-4">
        <NetworkSelect />
        <ConnectButton />
      </div> */}
    </header>
  )
}

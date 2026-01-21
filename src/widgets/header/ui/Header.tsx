import Link from 'next/link';
import clsx from 'clsx';

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-brand-primary text-white shadow-md">
      <div className="text-xl font-bold">My App</div>
      <nav className="flex gap-4">
        <Link href="/" className="hover:text-brand-tertiary transition-colors">
          Main
        </Link>
        <Link href="/about" className="hover:text-brand-tertiary transition-colors">
          About
        </Link>
      </nav>
    </header>
  );
};

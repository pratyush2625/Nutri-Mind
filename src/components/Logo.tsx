import Link from 'next/link';
import { Leaf } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Back to homepage">
      <div className="bg-primary p-2 rounded-md">
        <Leaf className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-headline font-bold hidden sm:inline-block">
        NutriMind
      </span>
    </Link>
  );
}

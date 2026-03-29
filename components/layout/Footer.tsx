import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 text-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-6">
          <span className="text-2xl font-bold text-indigo-600">CONNECT.</span>
        </div>
        <div className="flex justify-center gap-6 mb-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          <Link href="/about" className="hover:text-indigo-600 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
          <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
        </div>
        <p className="text-slate-500 dark:text-slate-500 text-sm flex items-center justify-center gap-1">
          Made with <Heart className="w-4 h-4 text-red-500" /> for the community.
        </p>
      </div>
    </footer>
  );
}

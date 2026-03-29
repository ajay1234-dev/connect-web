'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
            connect.
          </Link>
        </div>
        
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="#features" className="hover:text-indigo-600 transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</Link>
          <Link href="#impact" className="hover:text-indigo-600 transition-colors">Impact</Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/login" className="text-sm font-medium hover:text-indigo-600 transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

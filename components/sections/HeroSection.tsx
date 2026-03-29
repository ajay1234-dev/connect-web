'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, HeartHandshake } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          <div className="mb-6 flex justify-center">
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-500/20">
              Transforming social impact.
            </span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-7xl">
            Connecting Volunteers.<br className="hidden sm:block" /> Empowering Communities.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            A central control system where NGOs manage impactful events and volunteers find causes they care about. Join the movement to make a difference.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/register"
              className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center gap-2 transition-all"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/register?role=ngo" className="text-sm font-semibold leading-6 text-slate-900 dark:text-white flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Register as NGO <HeartHandshake className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';

const stats = [
  { id: 1, name: 'Volunteers Connected', value: '45,000+' },
  { id: 2, name: 'NGOs Onboarded', value: '1,200+' },
  { id: 3, name: 'Events Completed', value: '8,400+' },
];

export default function ImpactSection() {
  return (
    <section id="impact" className="relative isolate overflow-hidden bg-slate-900 py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.800),theme(colors.slate.900))] opacity-40" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-slate-800/20 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50/10 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Growing Impact</h2>
        <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
          We believe in transparent, measurable impact. Every event attended and every volunteer hour is tracked to show the real difference we make together.
        </p>

        <dl className="mt-16 grid grid-cols-1 gap-0 overflow-hidden rounded-2xl text-center sm:grid-cols-3 border border-white/10 bg-white/5 backdrop-blur-sm">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col bg-white/5 p-8"
            >
              <dt className="text-sm font-semibold leading-6 text-slate-300">{stat.name}</dt>
              <dd className="order-first text-4xl font-bold tracking-tight text-white mb-2">{stat.value}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

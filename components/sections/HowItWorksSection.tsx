'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    step: '01',
    title: 'NGOs Create Events',
    description: 'Registered and verified NGOs can set up welfare events, define required skills, and broadcast needs.',
  },
  {
    step: '02',
    title: 'Volunteers Join via App',
    description: 'Volunteers browse events near them on the mobile app and register for the ones matching their interests.',
  },
  {
    step: '03',
    title: 'Monitor & Manage',
    description: 'Admins oversee operations, while NGOs track attendance and measure the impact of their events in real-time.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            A seamless experience from event creation to on-ground execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-indigo-100 dark:bg-slate-800 z-0"></div>
          
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xl mb-6 shadow-lg shadow-indigo-600/30">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Users, CalendarCheck, ShieldCheck, Activity } from 'lucide-react';

const features = [
  {
    name: 'Smart Volunteer Matching',
    description: 'Connect with events that match your skills and location instantly.',
    icon: Users,
  },
  {
    name: 'NGO Event Management',
    description: 'Create, track, and manage large-scale welfare events with ease.',
    icon: CalendarCheck,
  },
  {
    name: 'Real-Time Coordination',
    description: 'Keep volunteers and organizers on the same page with live updates.',
    icon: Activity,
  },
  {
    name: 'Community Building & Trust',
    description: 'Verified NGOs and impact tracking ensure transparent social value.',
    icon: ShieldCheck,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Faster coordination</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Everything you need to drive impact
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-16 group"
              >
                <dt className="text-base font-semibold leading-7 text-slate-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 transition-transform group-hover:scale-110">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-slate-600 dark:text-slate-400">
                  {feature.description}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

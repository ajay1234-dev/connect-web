'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const defaultStats = [
  { id: 1, name: 'Volunteers Connected', value: '0' },
  { id: 2, name: 'NGOs Onboarded', value: '0' },
  { id: 3, name: 'Events Completed', value: '0' },
];

export default function ImpactSection() {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const ngoCount = await getCountFromServer(collection(db, 'ngos'));
        const eventCount = await getCountFromServer(collection(db, 'events'));
        
        // This might fail if public reads on users aren't allowed in rules
        let volunteerCount = { data: () => ({ count: 0 }) };
        try {
          volunteerCount = await getCountFromServer(query(collection(db, 'users'), where('role', '==', 'volunteer')));
        } catch (e) {
          console.warn("Could not fetch volunteer count due to security rules.");
        }

        setStats([
          { id: 1, name: 'Volunteers Connected', value: volunteerCount.data().count.toString() + '+' },
          { id: 2, name: 'NGOs Onboarded', value: ngoCount.data().count.toString() + '+' },
          { id: 3, name: 'Events Completed', value: eventCount.data().count.toString() + '+' },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }
    fetchCounts();
  }, []);
  return (
    <section id="impact" className="relative isolate overflow-hidden bg-slate-50 dark:bg-slate-900 py-24 sm:py-32 transition-colors duration-300">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),theme(colors.slate.50))] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.800),theme(colors.slate.900))] opacity-40 transition-colors duration-300" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-slate-100/50 dark:bg-slate-800/20 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 dark:ring-indigo-50/10 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center transition-colors duration-300" />
      
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Our Growing Impact</h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          We believe in transparent, measurable impact. Every event attended and every volunteer hour is tracked to show the real difference we make together.
        </p>

        <dl className="mt-16 grid grid-cols-1 gap-0 overflow-hidden rounded-2xl text-center sm:grid-cols-3 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none backdrop-blur-sm transition-colors duration-300">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col bg-white dark:bg-white/5 p-8 border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-white/5 last:border-0 transition-colors duration-300"
            >
              <dt className="text-sm font-semibold leading-6 text-slate-500 dark:text-slate-300">{stat.name}</dt>
              <dd className="order-first text-4xl font-bold tracking-tight text-indigo-600 dark:text-white mb-2">{stat.value}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

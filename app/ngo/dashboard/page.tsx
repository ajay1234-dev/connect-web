'use client';

import { useEffect, useState } from 'react';
import { Users, CalendarCheck, Megaphone } from 'lucide-react';
import Link from 'next/link';
import { collection, query, where, getCountFromServer } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

export default function NgoDashboard() {
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const q = query(collection(db, 'events'), where('ngoId', '==', user.uid));
          const snap = await getCountFromServer(q);
          setEventCount(snap.data().count);
        } catch(e) {
          console.error(e);
        }
      }
    });
    return () => unsub();
  }, []);

  const stats = [
    { name: 'My Active Events', value: eventCount, icon: CalendarCheck },
    { name: 'Registered Volunteers', value: '0', icon: Users },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back!</h1>
        <Link 
          href="/ngo/events/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          Create New Event
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
              <stat.icon className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.name}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Upcoming Events Overview</h2>
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
            <CalendarCheck className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
            <p>You haven't created any events yet.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Announcements</h2>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            <p>Tip: Complete your NGO profile and upload a cover image to attract more volunteers for your upcoming events.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

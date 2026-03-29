'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { CalendarPlus } from 'lucide-react';
import Link from 'next/link';

export default function NgoEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch if authed
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const q = query(collection(db, 'events'), where('ngoId', '==', user.uid));
          const snapshot = await getDocs(q);
          setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.error("Error fetching my events:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Events</h1>
        <Link 
          href="/ngo/events/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
        >
          Create New Event
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6 line-clamp-2">
        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
            <CalendarPlus className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
            <p className="mb-4">You have not created any events yet.</p>
            <Link href="/ngo/events/new" className="text-indigo-600 font-medium hover:underline">Start your first event</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="p-4 border border-slate-100 dark:border-slate-800 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white">{event.title}</h3>
                  <p className="text-sm text-slate-500 mb-2">{event.date} • {event.location}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 md:max-w-xl pr-4">
                    {event.description || "No description provided."}
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="text-sm bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 px-3 py-1 rounded-full font-medium whitespace-nowrap">
                    {event.volunteersNeeded} Volunteers Needed
                  </div>
                  <button className="text-slate-400 hover:text-red-500 text-sm font-medium">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Activity, Users, Building, CalendarCheck } from 'lucide-react';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState({
    ngos: 0,
    volunteers: 0,
    events: 0,
    activity: 0
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const ngoSnap = await getCountFromServer(collection(db, 'ngos'));
        const eventSnap = await getCountFromServer(collection(db, 'events'));
        // We catch volunteer errors in case rules remain tightened
        let volCount = 0;
        try {
          const volSnap = await getCountFromServer(query(collection(db, 'users'), where('role', '==', 'volunteer')));
          volCount = volSnap.data().count;
        } catch (e) {
          console.warn(e);
        }
        
        setStatsData({
          ngos: ngoSnap.data().count,
          events: eventSnap.data().count,
          volunteers: volCount,
          activity: 0 // Will implement logs later
        });
      } catch(e) {
        console.error(e);
      }
    }
    loadStats();
  }, []);

  const stats = [
    { name: 'Total NGOs', value: statsData.ngos, icon: Building },
    { name: 'Total Volunteers', value: statsData.volunteers, icon: Users },
    { name: 'Total Events', value: statsData.events, icon: CalendarCheck },
    { name: 'Active Logs', value: statsData.activity, icon: Activity },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Admin Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
          <Activity className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
          <p>Activity logs will appear here once Firestore real-time sync is enabled.</p>
        </div>
      </div>
    </div>
  );
}

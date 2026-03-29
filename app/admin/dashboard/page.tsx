'use client';

import { Activity, Users, Building, CalendarCheck } from 'lucide-react';

const stats = [
  { name: 'Total NGOs', value: '0', icon: Building },
  { name: 'Total Volunteers', value: '0', icon: Users },
  { name: 'Total Events', value: '0', icon: CalendarCheck },
  { name: 'Active Logs', value: '0', icon: Activity },
];

export default function AdminDashboard() {
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

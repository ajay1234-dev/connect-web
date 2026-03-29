'use client';

import { Users } from 'lucide-react';

export default function NgoVolunteersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Registered Volunteers</h1>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500 px-4">
          <Users className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
          <p className="max-w-md">No volunteers have joined your events yet. Make sure to publish your events and share the links with your network.</p>
        </div>
      </div>
    </div>
  );
}

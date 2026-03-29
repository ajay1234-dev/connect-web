'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Lock, Unlock } from 'lucide-react';

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVolunteers() {
      try {
        const q = query(collection(db, 'users'), where('role', '==', 'volunteer'));
        const snapshot = await getDocs(q);
        setVolunteers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching connecting volunteers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVolunteers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Manage Mobile Volunteers</h1>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <th className="p-4 font-medium text-slate-600 dark:text-slate-300">Name</th>
              <th className="p-4 font-medium text-slate-600 dark:text-slate-300 hidden md:table-cell">Email</th>
              <th className="p-4 font-medium text-slate-600 dark:text-slate-300">Status</th>
              <th className="p-4 font-medium text-slate-600 dark:text-slate-300 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">Retrieving volunteer database...</td></tr>
            ) : volunteers.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">No volunteers have registered on the mobile app yet.</td></tr>
            ) : (
              volunteers.map(volunteer => (
                <tr key={volunteer.id} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 text-slate-900 dark:text-white font-medium">{volunteer.name || 'Anonymous User'}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400 hidden md:table-cell">{volunteer.email}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                      Active
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button className="text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1 group" title="Block User">
                      <Lock className="w-5 h-5 group-hover:hidden" />
                      <Unlock className="w-5 h-5 hidden group-hover:block" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

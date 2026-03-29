'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function AdminNgosPage() {
  const [ngos, setNgos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNgos() {
      try {
        const snapshot = await getDocs(collection(db, 'ngos'));
        setNgos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching NGOs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNgos();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Manage NGOs</h1>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <th className="p-4 font-medium text-slate-600 dark:text-slate-300">Organization Name</th>
              <th className="p-4 font-medium text-slate-600 dark:text-slate-300">Location</th>
              <th className="p-4 font-medium text-slate-600 dark:text-slate-300">Status</th>
              <th className="p-4 font-medium text-slate-600 dark:text-slate-300 w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading NGOs...</td></tr>
            ) : ngos.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">No NGOs found.</td></tr>
            ) : (
              ngos.map(ngo => (
                <tr key={ngo.id} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 text-slate-900 dark:text-white font-medium">{ngo.name || 'Unnamed NGO'}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{ngo.location || 'N/A'}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${ngo.approvalStatus === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'}`}>
                      {ngo.approvalStatus || 'Pending'}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button className="text-green-600 hover:text-green-700" title="Approve"><CheckCircle2 className="w-5 h-5"/></button>
                    <button className="text-red-600 hover:text-red-700" title="Reject"><XCircle className="w-5 h-5"/></button>
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

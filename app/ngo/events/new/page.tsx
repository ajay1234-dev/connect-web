'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    volunteersNeeded: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!auth.currentUser) {
        toast.error('You must be logged in to create an event.');
        setLoading(false);
        return;
      }

      const eventData = {
        ngoId: auth.currentUser.uid,
        title: formData.title,
        description: formData.description,
        date: formData.date,
        location: formData.location,
        volunteersNeeded: Number(formData.volunteersNeeded),
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'events'), eventData);
      toast.success('Event created successfully!');
      router.push('/ngo/events');
    } catch (error: any) {
      console.error(error);
      toast.error('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/ngo/events" 
          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create New Event</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6 space-y-6">
        
        <div>
           <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Event Title</label>
           <input 
             required
             value={formData.title} 
             onChange={e => setFormData({...formData, title: e.target.value})}
             className="block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" 
             placeholder="e.g. Community Beach Cleanup"
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date & Time</label>
            <input 
              required
              type="datetime-local"
              value={formData.date} 
              onChange={e => setFormData({...formData, date: e.target.value})}
              className="block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Volunteers Needed</label>
            <input 
              required
              type="number"
              min="1"
              value={formData.volunteersNeeded} 
              onChange={e => setFormData({...formData, volunteersNeeded: e.target.value})}
              className="block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" 
              placeholder="e.g. 50"
            />
          </div>
        </div>
        
        <div>
           <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
           <input 
             required
             value={formData.location} 
             onChange={e => setFormData({...formData, location: e.target.value})}
             className="block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" 
             placeholder="Full address or meeting point"
           />
        </div>

        <div>
           <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Event Description</label>
           <textarea 
             required
             rows={4}
             value={formData.description} 
             onChange={e => setFormData({...formData, description: e.target.value})}
             className="block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" 
             placeholder="Describe what volunteers will be doing, what to bring, etc."
           />
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
          <button 
            disabled={loading}
            type="submit" 
            className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Publishing Event...' : 'Publish Event'}
          </button>
        </div>
      </form>
    </div>
  );
}

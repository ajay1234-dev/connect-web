'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { Upload } from 'lucide-react';

export default function NgoProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    description: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const snap = await getDoc(doc(db, 'ngos', user.uid));
        if (snap.exists()) setProfile({ ...profile, ...snap.data() });
      }
    });
    return () => unsub();
  }, []);

  const handleSave = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if(auth.currentUser) {
        await updateDoc(doc(db, 'ngos', auth.currentUser.uid), profile);
        toast.success("Profile saved securely!");
      }
    } catch(err) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">NGO Profile Settings</h1>
      
      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6 space-y-6">
        
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div className="h-24 w-24 rounded-full bg-indigo-50 dark:bg-slate-800 border-2 border-dashed border-indigo-200 dark:border-slate-700 flex items-center justify-center text-slate-400 group cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="flex flex-col items-center">
              <Upload className="h-6 w-6 mb-1 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
              <span className="text-xs font-semibold group-hover:text-indigo-600 transition-colors">Upload</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Profile Logo</h3>
            <p className="text-sm text-slate-500">We recommend an image of at least 300x300. (Supabase Storage integration required)</p>
          </div>
        </div>

        <div>
           <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Organization Name</label>
           <input 
             value={profile.name} 
             onChange={e => setProfile({...profile, name: e.target.value})}
             className="block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" 
           />
        </div>
        
        <div>
           <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Registration Location</label>
           <input 
             value={profile.location} 
             onChange={e => setProfile({...profile, location: e.target.value})}
             className="block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" 
           />
        </div>

        <div>
           <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">About the NGO</label>
           <textarea 
             rows={4}
             value={profile.description} 
             onChange={e => setProfile({...profile, description: e.target.value})}
             className="block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" 
           />
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

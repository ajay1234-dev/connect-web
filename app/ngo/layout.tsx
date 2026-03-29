'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, CalendarPlus, Users, Settings, Menu, X, Bell } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function NgoLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    document.cookie = "user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row">
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between h-16 px-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-30 sticky top-0 shadow-sm">
        <span className="text-xl font-bold text-indigo-600">NGO Hub</span>
        <div className="flex items-center gap-2">
          <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <ThemeToggle />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -mr-2 text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-[100dvh] w-64 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:flex
      `}>
        <div className="h-16 hidden md:flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
          <span className="text-xl font-bold text-indigo-600">NGO Hub</span>
          <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-16 md:mt-0">
          <Link href="/ngo/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center gap-3 px-3 py-2 text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 rounded-md font-medium transition-all duration-200 hover:translate-x-1 hover:bg-indigo-100 dark:hover:bg-indigo-500/20">
            <LayoutDashboard className="w-5 h-5 text-indigo-600 transition-transform group-hover:scale-110" />
            Dashboard
          </Link>
          <Link href="/ngo/events" onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-md font-medium transition-all duration-200 hover:translate-x-1">
            <CalendarPlus className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:text-indigo-500" />
            My Events
          </Link>
          <Link href="/ngo/volunteers" onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-md font-medium transition-all duration-200 hover:translate-x-1">
            <Users className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:text-indigo-500" />
            Volunteers
          </Link>
          <Link href="/ngo/profile" onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-md font-medium transition-all duration-200 hover:translate-x-1">
            <Settings className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:text-indigo-500" />
            Profile Settings
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400">
            <span>Theme Appereance</span>
            <ThemeToggle />
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md font-medium transition-all duration-200 hover:translate-x-1"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto w-full max-w-[100vw]">
        {children}
      </main>
    </div>
  );
}

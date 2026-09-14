import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, ArrowLeft, Home, Search } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="glass-card rounded-3xl p-8 sm:p-12 text-center max-w-lg w-full border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-6">
        {/* 404 Graphic */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="w-24 h-24 rounded-3xl bg-primary-100 dark:bg-primary-950/80 text-primary-600 dark:text-primary-400 flex items-center justify-center text-4xl font-extrabold animate-bounce">
            404
          </div>
          <div className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-cyan-500 text-white shadow-lg">
            <Stethoscope className="w-5 h-5" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            The URL or medical resource route you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-500/20 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Return to Doctors Home</span>
          </Link>

          <Link
            to="/appointments"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all"
          >
            <Search className="w-4 h-4" />
            <span>View My Appointments</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

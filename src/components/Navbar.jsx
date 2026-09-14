import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Calendar, 
  User, 
  Heart, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  PlusCircle 
} from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

export const Navbar = () => {
  const { theme, toggleTheme, favorites, userProfile } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeLinkClass = ({ isActive }) =>
    `flex items-center gap-2 text-sm font-semibold transition-all px-3 py-2 rounded-xl ${
      isActive
        ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20 dark:bg-primary-500'
        : 'text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-primary-700 via-primary-600 to-cyan-600 dark:from-primary-400 dark:to-cyan-400 bg-clip-text text-transparent">
                MediCare
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 -mt-1">
                Health Booking
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={activeLinkClass}>
              <Stethoscope className="w-4 h-4" />
              <span>Find Doctors</span>
            </NavLink>

            <NavLink to="/appointments" className={activeLinkClass}>
              <Calendar className="w-4 h-4" />
              <span>My Appointments</span>
            </NavLink>

            <NavLink to="/profile" className={activeLinkClass}>
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </NavLink>
          </nav>

          {/* Right Action Icons & Book CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Favorites Badge */}
            <Link 
              to="/?favorites=true"
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Favorite Doctors"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            {/* Book Now Primary CTA */}
            <Link
              to="/book"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-cyan-600 hover:from-primary-700 hover:to-cyan-700 rounded-xl shadow-md shadow-primary-500/25 hover:shadow-lg transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>

            {/* User Profile Avatar Link */}
            <Link to="/profile" className="ml-1 flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-500/40"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-4 space-y-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Stethoscope className="w-5 h-5 text-primary-500" />
            <span>Find Doctors</span>
          </NavLink>

          <NavLink
            to="/appointments"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Calendar className="w-5 h-5 text-primary-500" />
            <span>My Appointments</span>
          </NavLink>

          <NavLink
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <User className="w-5 h-5 text-primary-500" />
            <span>My Profile</span>
          </NavLink>

          <div className="pt-2">
            <Link
              to="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-center text-sm font-semibold text-white bg-primary-600 rounded-xl"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

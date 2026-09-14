import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppStore } from '../stores/useAppStore';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  Sun, 
  Moon, 
  Save, 
  ShieldCheck, 
  Droplet, 
  AlertCircle 
} from 'lucide-react';

export const ProfilePage = () => {
  const { userProfile, updateUserProfile, theme, toggleTheme, favorites } = useAppStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: userProfile,
  });

  const onSubmit = (formData) => {
    updateUserProfile(formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950 dark:text-primary-300">
          <User className="w-3.5 h-3.5" />
          <span>Zustand Global State & Profile Management</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Patient Profile & Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Manage your personal medical preferences, contact details, and app theme settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Avatar & Quick Settings */}
        <div className="md:col-span-4 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 text-center space-y-4 shadow-lg">
            <div className="relative w-24 h-24 mx-auto">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-primary-500/30 shadow-md"
              />
              <div className="absolute bottom-0 right-0 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-white ring-2 ring-white dark:ring-slate-900">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{userProfile.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{userProfile.email}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-around text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Blood Type</span>
                <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center justify-center gap-1">
                  <Droplet className="w-3 h-3 fill-rose-500" />
                  {userProfile.bloodType || 'O+'}
                </span>
              </div>
              <div className="border-l border-slate-100 dark:border-slate-800" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Favorites</span>
                <span className="font-bold text-primary-600 dark:text-primary-400 flex items-center justify-center gap-1">
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                  {favorites.length} Saved
                </span>
              </div>
            </div>
          </div>

          {/* Theme & Display Preferences (Zustand) */}
          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">App Preferences</h4>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Interface Mode:
              </span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:scale-105 transition-transform"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-slate-600" />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Profile Form */}
        <div className="md:col-span-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-xl"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  City / Location
                </label>
                <input
                  type="text"
                  {...register('city')}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Known Allergies
                </label>
                <input
                  type="text"
                  {...register('allergies')}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  {...register('emergencyContact')}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-500/20 transition-transform active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

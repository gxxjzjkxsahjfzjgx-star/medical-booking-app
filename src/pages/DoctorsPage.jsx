import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Heart, RefreshCw, AlertCircle, Stethoscope, Sparkles, Award, ShieldCheck, UserCheck } from 'lucide-react';
import { fetchDoctors } from '../services/api';
import { DoctorCard } from '../components/DoctorCard';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ControlledVsUncontrolledDemo } from '../components/ControlledVsUncontrolledDemo';
import { useAppStore } from '../stores/useAppStore';

const SPECIALTIES = [
  'All Specialties',
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'General Medicine',
  'Psychiatry',
  'Ophthalmology',
];

export const DoctorsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Controlled Input State for Search
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedSpecialty, setSelectedSpecialty] = useState(searchParams.get('specialty') || 'All Specialties');
  const [sortBy, setSortBy] = useState('rating');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(searchParams.get('favorites') === 'true');

  const { favorites } = useAppStore();

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchDoctors();
      setDoctors(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch doctors from server. Please verify API connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update search query when URL param changes
  useEffect(() => {
    if (searchParams.get('favorites') === 'true') {
      setShowOnlyFavorites(true);
    }
    if (searchParams.get('specialty')) {
      setSelectedSpecialty(searchParams.get('specialty'));
    }
  }, [searchParams]);

  // Filter & Sort Logic
  const filteredDoctors = useMemo(() => {
    return doctors
      .filter((doc) => {
        // Search by name, specialty, or clinic
        const matchesSearch =
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.clinic.toLowerCase().includes(searchQuery.toLowerCase());

        // Filter by specialty
        const matchesSpecialty =
          selectedSpecialty === 'All Specialties' || doc.specialty === selectedSpecialty;

        // Filter by favorites
        const matchesFavorites = !showOnlyFavorites || favorites.includes(String(doc.id));

        return matchesSearch && matchesSpecialty && matchesFavorites;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'fee-low') return a.fee - b.fee;
        if (sortBy === 'fee-high') return b.fee - a.fee;
        return 0;
      });
  }, [doctors, searchQuery, selectedSpecialty, showOnlyFavorites, favorites, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header Section */}
      <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-slate-900 via-primary-950 to-cyan-950 text-white shadow-2xl border border-slate-800">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/20 text-primary-300 border border-primary-500/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Top-Rated Certified Specialists</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Book Trusted Medical Experts Near You
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Find specialist doctors, review working slots, and book instant outpatient appointments with zero hassle.
          </p>

          {/* Key Feature Badges */}
          <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified MD Physicians</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>No Registration Fees</span>
            </div>
          </div>
        </div>

        {/* Decorative background pulse glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
      </div>

      {/* Controlled Search & Filters Section */}
      <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Controlled Input Field (Search) */}
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by doctor name, specialty, or clinic..."
              className="w-full pl-12 pr-4 py-3 text-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white transition-all cursor-pointer font-medium"
            >
              <option value="rating">Sort by Rating (Highest)</option>
              <option value="fee-low">Fee: Low to High</option>
              <option value="fee-high">Fee: High to Low</option>
            </select>
          </div>

          {/* Favorites Filter Toggle */}
          <div className="md:col-span-3">
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`w-full py-3 px-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 border transition-all ${
                showOnlyFavorites
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/25'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-white' : 'text-rose-500'}`} />
              <span>{showOnlyFavorites ? 'Showing Favorites' : 'Favorites Only'}</span>
              {favorites.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100 font-bold">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Specialty Filter Tabs Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SPECIALTIES.map((spec) => {
            const isSelected = selectedSpecialty === spec;
            return (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20 dark:bg-primary-500'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {spec}
              </button>
            );
          })}
        </div>
      </div>

      {/* Controlled vs Uncontrolled Educational Technical Proof Demo */}
      <ControlledVsUncontrolledDemo />

      {/* Doctors Grid Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Available Doctors</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-950 dark:text-primary-300 font-bold">
              {filteredDoctors.length}
            </span>
          </h2>

          <button
            onClick={loadData}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && <LoadingSkeleton count={8} />}

        {/* Error State */}
        {error && !loading && (
          <div className="glass-card rounded-3xl p-8 text-center max-w-md mx-auto space-y-4 border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20">
            <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">API Connection Error</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">{error}</p>
            <button
              onClick={loadData}
              className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-md"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredDoctors.length === 0 && (
          <div className="glass-card rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <Stethoscope className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Doctors Found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No medical specialists matched your current search parameters or specialty filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialty('All Specialties');
                setShowOnlyFavorites(false);
              }}
              className="px-4 py-2 text-xs font-bold text-primary-600 bg-primary-50 dark:bg-primary-950 dark:text-primary-300 rounded-xl hover:bg-primary-100 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Doctor Grid Cards */}
        {!loading && !error && filteredDoctors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

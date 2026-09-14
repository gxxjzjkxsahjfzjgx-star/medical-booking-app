import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  fetchDoctorById 
} from '../services/api';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Award, 
  Heart, 
  ArrowLeft, 
  CheckCircle, 
  ShieldCheck, 
  PlusCircle, 
  Building2 
} from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

export const DoctorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { favorites, toggleFavorite } = useAppStore();
  const isFavorite = doctor ? favorites.includes(String(doctor.id)) : false;

  useEffect(() => {
    const getDoctor = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDoctorById(id);
        setDoctor(data);
      } catch (err) {
        console.error(err);
        setError('Doctor details could not be found.');
      } finally {
        setLoading(false);
      }
    };
    getDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="animate-pulse space-y-6 glass-card p-8 rounded-3xl">
          <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-2xl mx-auto" />
          <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded mx-auto" />
          <div className="h-4 w-64 bg-slate-200 dark:bg-slate-800 rounded mx-auto" />
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Doctor Not Found</h2>
        <p className="text-xs text-slate-500">{error || 'Invalid doctor ID requested.'}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-primary-600 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Doctors Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Doctors</span>
      </button>

      {/* Main Profile Header Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-primary-500/20 shadow-xl"
          />

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary-100 text-primary-800 dark:bg-primary-950 dark:text-primary-300 mb-1">
                  {doctor.specialty}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {doctor.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {doctor.education}
                </p>
              </div>

              <button
                onClick={() => toggleFavorite(String(doctor.id))}
                className={`p-3 rounded-2xl border transition-all ${
                  isFavorite
                    ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 text-rose-500'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{doctor.rating}</span>
                <span className="text-slate-400 font-normal">({doctor.reviewsCount} reviews)</span>
              </div>

              <span className="text-slate-300 dark:text-slate-700">•</span>

              <div className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                <Award className="w-4 h-4 text-primary-500" />
                <span>{doctor.experience} experience</span>
              </div>

              <span className="text-slate-300 dark:text-slate-700">•</span>

              <div className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Board Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Bio & Practice Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">About Doctor</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {doctor.description}
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Clinic Location & Contact</h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">{doctor.clinic}</span>
                  <span>{doctor.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Working Days & Sample Slots */}
          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Working Schedule & Slots</h3>
            
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Available Working Days
              </span>
              <div className="flex flex-wrap gap-2">
                {doctor.workingDays.map((day) => (
                  <span
                    key={day}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Sample Consultation Slots
              </span>
              <div className="flex flex-wrap gap-2">
                {doctor.availableSlots.map((slot) => (
                  <span
                    key={slot}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/50"
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Booking Action Card */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-primary-200/80 dark:border-primary-900/80 shadow-xl space-y-6 bg-gradient-to-b from-white to-primary-50/30 dark:from-slate-900 dark:to-slate-900">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Consultation Fee
              </span>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                ${doctor.fee} <span className="text-xs text-slate-500 font-normal">/ session</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 border-t border-b border-slate-100 dark:border-slate-800 py-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Instant Appointment Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Free cancellation up to 24h before</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Digital prescription included</span>
              </div>
            </div>

            <Link
              to={`/book/${doctor.id}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-cyan-600 hover:from-primary-700 hover:to-cyan-700 rounded-2xl shadow-lg shadow-primary-500/30 transition-transform active:scale-95 text-center"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Book Appointment Now</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

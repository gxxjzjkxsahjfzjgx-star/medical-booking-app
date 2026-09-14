import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';

export const DoctorCard = ({ doctor }) => {
  const { favorites, toggleFavorite } = useAppStore();
  const isFavorite = favorites.includes(String(doctor.id));

  return (
    <div className="group glass-card rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden border border-slate-200/80 dark:border-slate-800">
      {/* Top Specialty Badge & Favorite Button */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/50">
            {doctor.specialty}
          </span>

          <button
            onClick={() => toggleFavorite(String(doctor.id))}
            className={`p-2 rounded-xl transition-transform active:scale-90 ${
              isFavorite
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-500'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-500'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Doctor Info Section */}
        <div className="flex items-start gap-4 mb-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary-500/20 group-hover:scale-105 transition-transform"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-slate-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {doctor.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mb-1">
              {doctor.clinic}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {doctor.rating}
              </span>
              <span className="text-slate-400">({doctor.reviewsCount} reviews)</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-300 font-semibold">{doctor.experience}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {doctor.description}
        </p>

        {/* Location & Working Days */}
        <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 mb-5">
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-primary-500" />
            <span className="truncate">{doctor.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 shrink-0 text-primary-500" />
            <span>{doctor.workingDays.slice(0, 3).join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Footer Fee & Action CTAs */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Consultation Fee</span>
          <span className="text-base font-extrabold text-slate-900 dark:text-white">${doctor.fee}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/doctors/${doctor.id}`}
            className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Details
          </Link>
          <Link
            to={`/book/${doctor.id}`}
            className="flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-500/20 transition-transform active:scale-95"
          >
            <span>Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

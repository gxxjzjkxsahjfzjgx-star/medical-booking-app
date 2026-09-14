import React from 'react';
import { Calendar, Clock, User, Phone, Mail, FileText, Edit2, Trash2, CheckCircle } from 'lucide-react';

export const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950/70 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-sm">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {appointment.doctorName}
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <CheckCircle className="w-3 h-3 mr-1" />
                {appointment.status || 'Confirmed'}
              </span>
            </div>
            <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">
              {appointment.doctorSpecialty}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={() => onEdit(appointment)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors"
            title="Reschedule / Edit Appointment"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>

          <button
            onClick={() => onDelete(appointment)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 dark:text-rose-300 rounded-xl transition-colors"
            title="Cancel Appointment"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
        </div>
      </div>

      {/* Appointment Date & Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 text-xs">
        <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
          <Calendar className="w-4 h-4 text-primary-500 shrink-0" />
          <div>
            <span className="block text-[10px] text-slate-400 font-semibold uppercase">Date</span>
            <span className="font-semibold">{appointment.appointmentDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
          <Clock className="w-4 h-4 text-primary-500 shrink-0" />
          <div>
            <span className="block text-[10px] text-slate-400 font-semibold uppercase">Time Slot</span>
            <span className="font-semibold">{appointment.timeSlot}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
          <User className="w-4 h-4 text-primary-500 shrink-0" />
          <div>
            <span className="block text-[10px] text-slate-400 font-semibold uppercase">Patient Name</span>
            <span className="font-semibold">{appointment.patientName}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
          <Mail className="w-4 h-4 text-primary-500 shrink-0" />
          <div>
            <span className="block text-[10px] text-slate-400 font-semibold uppercase">Email</span>
            <span className="font-semibold truncate max-w-[150px]">{appointment.email}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
          <Phone className="w-4 h-4 text-primary-500 shrink-0" />
          <div>
            <span className="block text-[10px] text-slate-400 font-semibold uppercase">Phone</span>
            <span className="font-semibold">{appointment.phone}</span>
          </div>
        </div>

        {appointment.reason && (
          <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300 md:col-span-2 lg:col-span-3">
            <FileText className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
            <div>
              <span className="block text-[10px] text-slate-400 font-semibold uppercase">Reason / Note</span>
              <p className="text-slate-600 dark:text-slate-400 italic">{appointment.reason}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

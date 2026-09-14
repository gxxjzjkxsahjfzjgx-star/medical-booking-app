import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  fetchAppointments, 
  updateAppointment, 
  deleteAppointment 
} from '../services/api';
import { AppointmentCard } from '../components/AppointmentCard';
import { Modal } from '../components/Modal';
import { useAppStore } from '../stores/useAppStore';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  PlusCircle, 
  RefreshCw, 
  AlertTriangle, 
  Trash2, 
  Save, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';

export const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit Modal State
  const [editingAppointment, setEditingAppointment] = useState(null);

  // Delete Modal State
  const [deletingAppointment, setDeletingAppointment] = useState(null);

  const { addToast } = useAppStore();

  // React Hook Form for Edit Modal
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEditForm,
    formState: { errors: editErrors },
  } = useForm();

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAppointments();
      setAppointments(data);
    } catch (err) {
      console.error(err);
      setError('Could not retrieve appointments from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // Open Edit Modal
  const handleOpenEdit = (apt) => {
    setEditingAppointment(apt);
    resetEditForm({
      patientName: apt.patientName,
      email: apt.email,
      phone: apt.phone,
      appointmentDate: apt.appointmentDate,
      timeSlot: apt.timeSlot,
      reason: apt.reason || '',
    });
  };

  // Submit Edit Form (UPDATE Operation)
  const onSaveEdit = async (formData) => {
    if (!editingAppointment) return;
    try {
      const updatedPayload = {
        ...editingAppointment,
        ...formData,
      };

      await updateAppointment(editingAppointment.id, updatedPayload);

      addToast({
        type: 'success',
        title: 'Appointment Rescheduled',
        message: `Updated date to ${formData.appointmentDate} at ${formData.timeSlot}`,
      });

      setEditingAppointment(null);
      loadAppointments();
    } catch (err) {
      console.error(err);
      addToast({
        type: 'error',
        title: 'Update Failed',
        message: 'Could not save appointment modifications.',
      });
    }
  };

  // Confirm Delete Action (DELETE Operation)
  const onConfirmDelete = async () => {
    if (!deletingAppointment) return;
    try {
      await deleteAppointment(deletingAppointment.id);

      addToast({
        type: 'info',
        title: 'Appointment Cancelled',
        message: `Appointment with ${deletingAppointment.doctorName} was removed.`,
      });

      setDeletingAppointment(null);
      loadAppointments();
    } catch (err) {
      console.error(err);
      addToast({
        type: 'error',
        title: 'Cancellation Failed',
        message: 'Could not remove appointment from server.',
      });
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950 dark:text-primary-300 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Full CRUD Appointment Management</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            My Appointments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            View, reschedule, or cancel your scheduled medical consultations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAppointments}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <Link
            to="/book"
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-500/20 transition-transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Book New Appointment</span>
          </Link>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="glass-card rounded-2xl p-6 h-40 bg-slate-100 dark:bg-slate-800/50" />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="glass-card rounded-3xl p-8 text-center max-w-md mx-auto space-y-4 border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20">
          <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Error Loading Data</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">{error}</p>
          <button
            onClick={loadAppointments}
            className="px-4 py-2 text-xs font-bold text-white bg-rose-600 rounded-xl shadow"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && appointments.length === 0 && (
        <div className="glass-card rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 border border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-950 flex items-center justify-center mx-auto text-primary-500">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Appointments Scheduled</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            You haven't booked any medical consultations yet. Select a doctor to schedule your first visit.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-primary-600 rounded-xl shadow-lg shadow-primary-500/30"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Book Appointment Now</span>
          </Link>
        </div>
      )}

      {/* READ Appointments List */}
      {!loading && !error && appointments.length > 0 && (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              onEdit={handleOpenEdit}
              onDelete={setDeletingAppointment}
            />
          ))}
        </div>
      )}

      {/* UPDATE / EDIT MODAL */}
      <Modal
        isOpen={Boolean(editingAppointment)}
        onClose={() => setEditingAppointment(null)}
        title="Reschedule / Edit Appointment"
      >
        {editingAppointment && (
          <form onSubmit={handleSubmitEdit(onSaveEdit)} className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs">
              <span className="font-bold text-slate-900 dark:text-white">Doctor:</span>{' '}
              {editingAppointment.doctorName} ({editingAppointment.doctorSpecialty})
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  New Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  {...registerEdit('appointmentDate', { required: 'Date is required' })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                {editErrors.appointmentDate && (
                  <p className="text-[10px] text-rose-500">{editErrors.appointmentDate.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Time Slot <span className="text-rose-500">*</span>
                </label>
                <select
                  {...registerEdit('timeSlot', { required: 'Time slot is required' })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="01:30 PM">01:30 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Patient Name
                </label>
                <input
                  type="text"
                  {...registerEdit('patientName', { required: true })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Phone Number
                </label>
                <input
                  type="text"
                  {...registerEdit('phone', { required: true })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Update Reason / Note
              </label>
              <textarea
                {...registerEdit('reason')}
                rows={2}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditingAppointment(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* DELETE / CANCEL CONFIRMATION MODAL */}
      <Modal
        isOpen={Boolean(deletingAppointment)}
        onClose={() => setDeletingAppointment(null)}
        title="Confirm Appointment Cancellation"
      >
        {deletingAppointment && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-rose-900 dark:text-rose-200 text-sm">Are you sure?</h4>
                <p className="text-rose-700 dark:text-rose-300 mt-1">
                  This will cancel your scheduled appointment with{' '}
                  <span className="font-bold">{deletingAppointment.doctorName}</span> on{' '}
                  <span className="font-bold">{deletingAppointment.appointmentDate}</span>.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingAppointment(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl"
              >
                Keep Appointment
              </button>

              <button
                type="button"
                onClick={onConfirmDelete}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete / Cancel</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

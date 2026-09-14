import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchDoctors, createAppointment } from '../services/api';
import { useAppStore } from '../stores/useAppStore';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Stethoscope, 
  CheckCircle2, 
  Sparkles, 
  Tag, 
  ArrowLeft 
} from 'lucide-react';

export const BookAppointmentPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [selectedDoctorObj, setSelectedDoctorObj] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addToast, userProfile } = useAppStore();

  // 1. React Hook Form Setup with Validation Rules
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patientName: userProfile.name || '',
      email: userProfile.email || '',
      phone: userProfile.phone || '',
      doctorId: doctorId || '',
      appointmentDate: '',
      timeSlot: '10:00 AM',
      reason: '',
    },
  });

  const watchedDoctorId = watch('doctorId');

  // 2. Uncontrolled Input Example using useRef (Project Requirement!)
  const referralCodeRef = useRef(null);
  const [appliedReferral, setAppliedReferral] = useState('');

  const handleApplyReferral = () => {
    if (referralCodeRef.current) {
      const val = referralCodeRef.current.value.trim().toUpperCase();
      if (val) {
        setAppliedReferral(val);
        addToast({
          type: 'success',
          title: 'Referral Applied',
          message: `Code "${val}" validated using uncontrolled useRef input.`,
        });
      }
    }
  };

  // Fetch doctors list for dropdown
  useEffect(() => {
    const getDocs = async () => {
      try {
        setLoadingDoctors(true);
        const data = await fetchDoctors();
        setDoctors(data);

        // Pre-select if doctorId passed in URL
        if (doctorId) {
          const found = data.find((d) => String(d.id) === String(doctorId));
          if (found) {
            setSelectedDoctorObj(found);
            setValue('doctorId', String(found.id));
          }
        } else if (data.length > 0) {
          setSelectedDoctorObj(data[0]);
          setValue('doctorId', String(data[0].id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDoctors(false);
      }
    };
    getDocs();
  }, [doctorId, setValue]);

  // Update selected doctor object when doctorId selection changes
  useEffect(() => {
    if (doctors.length > 0 && watchedDoctorId) {
      const found = doctors.find((d) => String(d.id) === String(watchedDoctorId));
      setSelectedDoctorObj(found || null);
    }
  }, [watchedDoctorId, doctors]);

  // Minimum allowed date is today
  const todayStr = new Date().toISOString().split('T')[0];

  // Form Submit Handler
  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);

      // Extract value from uncontrolled ref input
      const referralCodeValue = referralCodeRef.current ? referralCodeRef.current.value : '';

      const appointmentPayload = {
        ...formData,
        doctorName: selectedDoctorObj ? selectedDoctorObj.name : 'Medical Specialist',
        doctorSpecialty: selectedDoctorObj ? selectedDoctorObj.specialty : 'General',
        referralCode: referralCodeValue,
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
      };

      const response = await createAppointment(appointmentPayload);

      addToast({
        type: 'success',
        title: 'Appointment Booked Successfully!',
        message: `Confirmed with ${appointmentPayload.doctorName} for ${formData.appointmentDate} at ${formData.timeSlot}`,
      });

      navigate('/appointments');
    } catch (err) {
      console.error(err);
      addToast({
        type: 'error',
        title: 'Booking Failed',
        message: 'Could not create appointment. Please check your inputs.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950 dark:text-primary-300">
          <Calendar className="w-3.5 h-3.5" />
          <span>Patient Appointment Form</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Schedule Consultation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Complete the patient details below to confirm your slot with our healthcare provider.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6 shadow-xl"
          >
            {/* 1. Doctor Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Select Medical Specialist <span className="text-rose-500">*</span>
              </label>
              <select
                {...register('doctorId', { required: 'Please select a doctor' })}
                className={`w-full px-4 py-3 text-sm rounded-2xl border bg-white dark:bg-slate-900 focus:ring-2 outline-none text-slate-900 dark:text-white font-medium ${
                  errors.doctorId
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-slate-200 dark:border-slate-800 focus:ring-primary-500'
                }`}
              >
                <option value="">-- Choose Doctor --</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} ({doc.specialty}) - ${doc.fee}
                  </option>
                ))}
              </select>
              {errors.doctorId && (
                <p className="text-xs text-rose-500 font-medium">{errors.doctorId.message}</p>
              )}
            </div>

            {/* 2. Patient Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Patient Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    {...register('patientName', {
                      required: 'Patient name is required',
                      minLength: { value: 3, message: 'Name must be at least 3 characters' },
                    })}
                    placeholder="John Doe"
                    className={`w-full pl-10 pr-4 py-3 text-sm rounded-2xl border bg-white dark:bg-slate-900 focus:ring-2 outline-none text-slate-900 dark:text-white ${
                      errors.patientName
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-slate-800 focus:ring-primary-500'
                    }`}
                  />
                </div>
                {errors.patientName && (
                  <p className="text-xs text-rose-500 font-medium">{errors.patientName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address format',
                      },
                    })}
                    placeholder="patient@example.com"
                    className={`w-full pl-10 pr-4 py-3 text-sm rounded-2xl border bg-white dark:bg-slate-900 focus:ring-2 outline-none text-slate-900 dark:text-white ${
                      errors.email
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-slate-800 focus:ring-primary-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-500 font-medium">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* 3. Phone & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    {...register('phone', {
                      required: 'Phone number is required',
                      minLength: { value: 7, message: 'Enter a valid phone number' },
                    })}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full pl-10 pr-4 py-3 text-sm rounded-2xl border bg-white dark:bg-slate-900 focus:ring-2 outline-none text-slate-900 dark:text-white ${
                      errors.phone
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-slate-800 focus:ring-primary-500'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-rose-500 font-medium">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Appointment Date <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    min={todayStr}
                    {...register('appointmentDate', {
                      required: 'Please pick an appointment date',
                    })}
                    className={`w-full pl-10 pr-4 py-3 text-sm rounded-2xl border bg-white dark:bg-slate-900 focus:ring-2 outline-none text-slate-900 dark:text-white ${
                      errors.appointmentDate
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-200 dark:border-slate-800 focus:ring-primary-500'
                    }`}
                  />
                </div>
                {errors.appointmentDate && (
                  <p className="text-xs text-rose-500 font-medium">
                    {errors.appointmentDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* 4. Time Slot */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Select Consultation Time Slot <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedDoctorObj?.availableSlots ? (
                  selectedDoctorObj.availableSlots.map((slot) => {
                    const currentSlot = watch('timeSlot');
                    return (
                      <label
                        key={slot}
                        className={`flex items-center justify-center gap-1.5 p-3 rounded-2xl border text-xs font-bold cursor-pointer transition-all ${
                          currentSlot === slot
                            ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-400'
                        }`}
                      >
                        <input
                          type="radio"
                          value={slot}
                          {...register('timeSlot', { required: true })}
                          className="sr-only"
                        />
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot}</span>
                      </label>
                    );
                  })
                ) : (
                  ['09:00 AM', '10:30 AM', '02:00 PM', '04:00 PM'].map((slot) => (
                    <label
                      key={slot}
                      className="flex items-center justify-center gap-1.5 p-3 rounded-2xl border text-xs font-bold cursor-pointer bg-slate-50 dark:bg-slate-900 border-slate-200 text-slate-700"
                    >
                      <input type="radio" value={slot} {...register('timeSlot')} className="sr-only" />
                      <Clock className="w-3.5 h-3.5" />
                      <span>{slot}</span>
                    </label>
                  ))
                )}
              </div>
            </div>

            {/* 5. Uncontrolled Input Example (useRef) */}
            <div className="p-4 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-200/60 dark:border-cyan-900/60 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Promo / Referral Code (Uncontrolled useRef Example)</span>
                </label>
                <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950 px-2 py-0.5 rounded-full">
                  useRef Input
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  ref={referralCodeRef}
                  type="text"
                  defaultValue="HEALTH2026"
                  placeholder="e.g. HEALTH2026"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-cyan-300 dark:border-cyan-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  type="button"
                  onClick={handleApplyReferral}
                  className="px-4 py-2 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl transition-colors shrink-0"
                >
                  Validate Ref
                </button>
              </div>
              {appliedReferral && (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Code "{appliedReferral}" attached to booking.
                </p>
              )}
            </div>

            {/* 6. Medical Reason / Note */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Reason for Visit / Symptoms (Optional)
              </label>
              <textarea
                {...register('reason')}
                rows={3}
                placeholder="Briefly describe your symptoms or reason for scheduling..."
                className="w-full px-4 py-3 text-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-base font-bold text-white bg-gradient-to-r from-primary-600 to-cyan-600 hover:from-primary-700 hover:to-cyan-700 rounded-2xl shadow-xl shadow-primary-500/30 transition-transform active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Booking...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirm & Complete Booking</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {selectedDoctorObj && (
            <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-lg sticky top-24">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Booking Summary</h3>
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <img
                  src={selectedDoctorObj.image}
                  alt={selectedDoctorObj.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary-500/30"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {selectedDoctorObj.name}
                  </h4>
                  <span className="text-xs text-primary-600 font-medium">{selectedDoctorObj.specialty}</span>
                  <p className="text-[11px] text-slate-400">{selectedDoctorObj.clinic}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Consultation Fee:</span>
                  <span className="font-bold text-slate-900 dark:text-white">${selectedDoctorObj.fee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Booking Fee:</span>
                  <span className="font-bold text-emerald-500">FREE</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2 text-sm">
                  <span className="font-bold text-slate-900 dark:text-white">Total Amount:</span>
                  <span className="font-extrabold text-primary-600 dark:text-primary-400">${selectedDoctorObj.fee}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

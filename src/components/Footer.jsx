import React from 'react';
import { Stethoscope, Heart, Shield, Award, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold text-white">MediCare</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Modern patient booking platform connecting you with board-certified healthcare professionals quickly and seamlessly.
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-400">
              <Shield className="w-4 h-4" />
              <span>HIPAA Compliant & Secure</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Find Doctors</Link></li>
              <li><Link to="/appointments" className="hover:text-primary-400 transition-colors">My Appointments</Link></li>
              <li><Link to="/book" className="hover:text-primary-400 transition-colors">Book New Appointment</Link></li>
              <li><Link to="/profile" className="hover:text-primary-400 transition-colors">Patient Profile & Settings</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Top Specialties</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/?specialty=Cardiology" className="hover:text-primary-400 transition-colors">Cardiology</Link></li>
              <li><Link to="/?specialty=Dermatology" className="hover:text-primary-400 transition-colors">Dermatology</Link></li>
              <li><Link to="/?specialty=Neurology" className="hover:text-primary-400 transition-colors">Neurology</Link></li>
              <li><Link to="/?specialty=Pediatrics" className="hover:text-primary-400 transition-colors">Pediatrics</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Emergency Contact</h4>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <Phone className="w-4 h-4" />
                <span>24/7 Helpline: 911 / 1-800-MED</span>
              </div>
              <p className="text-[11px] text-slate-400">
                For medical emergencies, please dial emergency services immediately.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MediCare App. Built with React, React Router, Zustand & Axios.</p>
          <div className="flex items-center gap-1">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

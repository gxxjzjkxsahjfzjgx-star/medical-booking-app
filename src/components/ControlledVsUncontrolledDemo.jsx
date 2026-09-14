import React, { useState, useRef } from 'react';
import { Sparkles, Code2, Check, RefreshCw } from 'lucide-react';

export const ControlledVsUncontrolledDemo = () => {
  // 1. Controlled Input State Example
  const [controlledText, setControlledText] = useState('Dr. Sarah');

  // 2. Uncontrolled Input Example with useRef
  const uncontrolledInputRef = useRef(null);
  const [uncontrolledValue, setUncontrolledValue] = useState('');

  const handleReadUncontrolled = () => {
    if (uncontrolledInputRef.current) {
      setUncontrolledValue(uncontrolledInputRef.current.value);
    }
  };

  const handleFocusUncontrolled = () => {
    if (uncontrolledInputRef.current) {
      uncontrolledInputRef.current.focus();
      uncontrolledInputRef.current.select();
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-primary-200/50 dark:border-primary-900/50 bg-gradient-to-br from-primary-50/50 via-white to-cyan-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-primary-950/20 my-8 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-xl bg-primary-600 text-white shadow-md shadow-primary-500/30">
          <Code2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            React Technical Proof: Controlled vs. Uncontrolled Inputs
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Demonstrating required React state patterns for project evaluation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Controlled Input Box */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
              1. Controlled Input (useState)
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              State Driven
            </span>
          </div>

          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
            Live Search Binding:
          </label>
          <input
            type="text"
            value={controlledText}
            onChange={(e) => setControlledText(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 dark:text-white"
            placeholder="Type doctor name..."
          />
          <div className="text-[11px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-900 p-2 rounded-lg truncate">
            stateValue: <span className="text-primary-600 font-semibold">"{controlledText}"</span>
          </div>
        </div>

        {/* Uncontrolled Input Box with useRef */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              2. Uncontrolled Input (useRef)
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
              DOM Ref Driven
            </span>
          </div>

          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
            Referral / Promo Code (Ref Node):
          </label>
          <div className="flex gap-2">
            <input
              ref={uncontrolledInputRef}
              type="text"
              defaultValue="HEALTH2026"
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white"
              placeholder="Enter code..."
            />
            <button
              type="button"
              onClick={handleFocusUncontrolled}
              className="px-3 py-2 text-xs font-semibold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/80 dark:text-cyan-300 rounded-xl transition-colors shrink-0"
            >
              Focus Ref
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <button
              type="button"
              onClick={handleReadUncontrolled}
              className="text-xs font-medium text-primary-600 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Read ref.current.value
            </button>
            <span className="font-mono text-slate-500">
              Read Value: <span className="font-bold text-cyan-600">"{uncontrolledValue || 'HEALTH2026'}"</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

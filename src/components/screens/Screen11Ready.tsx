import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Settings, Check, Layers, Zap, LayoutDashboard, RotateCcw } from 'lucide-react';
import { useOnboardingStore } from '../../store/onboardingStore';
import { generateRecommendation } from '../../lib/recommendations';

export const Screen11Ready: React.FC = () => {
  const { data, complete, trackEvent } = useOnboardingStore();
  const rec = generateRecommendation(data);

  useEffect(() => {
    trackEvent('onboarding_completed', {
      businessType: data.businessType,
      role: data.role,
      teamSize: data.teamSize,
      goalCount: data.goals.length,
    });
    complete();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const summary = [
    { icon: '🏢', label: 'Business', value: data.businessType || 'Not specified' },
    { icon: '👤', label: 'Your Role', value: data.role || 'Not specified' },
    { icon: '👥', label: 'Team Size', value: data.teamSize || 'Not specified' },
    { icon: '🔄', label: 'Migrating From', value: data.currentCRM || 'Not specified' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">Z</span>
          </div>
          <span className="font-semibold text-gray-800 text-sm">Zoho CRM</span>
          <span className="ml-auto text-xs text-green-600 bg-green-100 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
            <Check size={11} strokeWidth={3} />
            Setup Complete
          </span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Hero */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="relative inline-block mb-4"
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto shadow-2xl shadow-indigo-200">
                  <span className="text-4xl">🚀</span>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-3xl bg-indigo-400 -z-10"
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold text-gray-900 mb-2"
              >
                Your CRM is ready{data.companyName ? `, ${data.companyName}` : ''}! 🎉
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-500 text-lg"
              >
                Everything is configured and personalized for you.
              </motion.p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {/* Business Summary */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
              >
                <h3 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">📋</span>
                  Your Profile
                </h3>
                <div className="space-y-2">
                  {summary.map(s => (
                    <div key={s.label} className="flex items-center gap-2">
                      <span className="text-sm">{s.icon}</span>
                      <span className="text-xs text-gray-400 w-20 flex-shrink-0">{s.label}</span>
                      <span className="text-xs font-medium text-gray-700 truncate">{s.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Goals */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
              >
                <h3 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center text-sm">🎯</span>
                  Your Goals
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {(data.goals.length ? data.goals : ['Manage Contacts', 'Track Deals']).map(g => (
                    <span key={g} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-lg font-medium border border-purple-100">
                      {g}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Modules */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
              >
                <h3 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Layers size={12} className="text-blue-600" />
                  </span>
                  Configured Modules
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {rec.modules.map(m => (
                    <span key={m} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg border border-blue-100">
                      <Check size={9} strokeWidth={3} />
                      {m}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Automations */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.54 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
              >
                <h3 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Zap size={12} className="text-amber-600" />
                  </span>
                  Automations Ready
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {rec.automations.map(a => (
                    <span key={a} className="flex items-center gap-1 text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-lg border border-amber-100">
                      <Zap size={9} />
                      {a}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62 }}
              className="space-y-3"
            >
              <motion.a
                href="#crm"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-200 hover:shadow-2xl transition-all"
                onClick={(e) => { e.preventDefault(); alert('Launching Zoho CRM... 🚀'); }}
              >
                Enter Zoho CRM
                <ArrowRight size={20} />
              </motion.a>
              <button
                onClick={() => useOnboardingStore.getState().setStep(9)}
                className="w-full py-3 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 transition-all"
              >
                <Settings size={15} />
                Review Setup
              </button>
              <button
                onClick={() => useOnboardingStore.getState().reset()}
                className="w-full py-3 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <RotateCcw size={14} />
                Start Over
              </button>
            </motion.div>

            {/* Migration note */}
            {data.migrationHelp && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-2xl text-center"
              >
                <p className="text-sm text-indigo-700">
                  ✉️ A Zoho migration expert will reach out within 24 hours to help transfer your data.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SelectionCard } from '../ui/SelectionCard';
import { StepLayout } from '../ui/StepLayout';
import { useOnboardingStore } from '../../store/onboardingStore';

const crms = [
  { label: 'Salesforce', icon: '☁️' },
  { label: 'HubSpot', icon: '🟠' },
  { label: 'Microsoft Dynamics', icon: '🔷' },
  { label: 'Pipedrive', icon: '🟢' },
  { label: 'Monday CRM', icon: '⬛' },
  { label: 'Freshsales', icon: '🌿' },
  { label: 'Spreadsheet', icon: '📊' },
  { label: 'No CRM', icon: '🆕' },
  { label: 'Other', icon: '✦' },
];

const contactOptions = ['< 500', '500–2,000', '2,001–10,000', '10,000+'];

export const Screen7CurrentCRM: React.FC = () => {
  const { nextStep, prevStep, data, updateData, trackEvent } = useOnboardingStore();
  const [showMigration, setShowMigration] = useState(
    !['No CRM', ''].includes(data.currentCRM) && !!data.currentCRM
  );

  const select = (crm: string) => {
    updateData({ currentCRM: crm });
    trackEvent('crm_selected', { crm });
    const needsMigration = crm !== 'No CRM' && crm !== 'Other';
    setShowMigration(needsMigration);
    if (!needsMigration) setTimeout(nextStep, 200);
  };

  const canContinue = !!data.currentCRM;

  return (
    <StepLayout onBack={prevStep} stepKey="screen7">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 text-center">
          <span className="text-3xl block mb-3">🔄</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Are you switching from another CRM?</h2>
          <p className="text-gray-500">We'll help you migrate your data seamlessly.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 mb-4">
          {crms.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <SelectionCard
                label={c.label}
                icon={c.icon}
                selected={data.currentCRM === c.label}
                onClick={() => select(c.label)}
                size="sm"
              />
            </motion.div>
          ))}
        </div>

        {/* Migration follow-up */}
        <AnimatePresence>
          {showMigration && data.currentCRM && !['No CRM', ''].includes(data.currentCRM) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 space-y-4 mb-4">
                <p className="text-sm font-semibold text-indigo-800">
                  Great! We'll help you migrate from {data.currentCRM}.
                </p>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How many contacts do you have?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {contactOptions.map(opt => (
                      <button
                        key={opt}
                        onClick={() => updateData({ contactCount: contactOptions.indexOf(opt) + 1 })}
                        className={`py-2 px-3 rounded-xl text-sm font-medium border-2 transition-all ${
                          data.contactCount === contactOptions.indexOf(opt) + 1
                            ? 'border-indigo-500 bg-indigo-100 text-indigo-700'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200">
                  <input
                    type="checkbox"
                    id="migration-help"
                    checked={data.migrationHelp || false}
                    onChange={e => updateData({ migrationHelp: e.target.checked })}
                    className="w-4 h-4 accent-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="migration-help" className="text-sm text-gray-700 cursor-pointer">
                    I'd like help with data migration from a Zoho expert
                  </label>
                </div>
              </div>

              <motion.button
                onClick={nextStep}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200 hover:shadow-xl transition-all"
              >
                Continue
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </StepLayout>
  );
};

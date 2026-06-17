import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SelectionCard } from '../ui/SelectionCard';
import { StepLayout } from '../ui/StepLayout';
import { useOnboardingStore } from '../../store/onboardingStore';

const goals = [
  { label: 'Capture Leads', icon: '🎯' },
  { label: 'Manage Contacts', icon: '📋' },
  { label: 'Track Deals', icon: '💼' },
  { label: 'Build Sales Pipeline', icon: '🚀' },
  { label: 'Automate Follow-ups', icon: '⚡' },
  { label: 'Marketing Campaigns', icon: '📣' },
  { label: 'Reporting & Analytics', icon: '📊' },
  { label: 'Revenue Forecasting', icon: '📈' },
  { label: 'Customer Retention', icon: '❤️' },
];

export const Screen6Goals: React.FC = () => {
  const { nextStep, prevStep, data, updateData, trackEvent } = useOnboardingStore();

  const toggle = (goal: string) => {
    const current = data.goals;
    const updated = current.includes(goal)
      ? current.filter(g => g !== goal)
      : [...current, goal];
    updateData({ goals: updated });
    trackEvent('goal_selected', { goal, selected: !current.includes(goal) });
  };

  const canContinue = data.goals.length > 0;

  return (
    <StepLayout onBack={prevStep} stepKey="screen6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6 text-center">
          <span className="text-3xl block mb-3">🎯</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">What would you like to achieve first?</h2>
          <p className="text-gray-500">Select all that apply — we'll prioritize your setup.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {goals.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <SelectionCard
                label={g.label}
                icon={g.icon}
                selected={data.goals.includes(g.label)}
                onClick={() => toggle(g.label)}
                multiSelect
              />
            </motion.div>
          ))}
        </div>

        {/* Selection count */}
        <div className="text-center mb-4">
          <motion.span
            key={data.goals.length}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-sm text-gray-500"
          >
            {data.goals.length === 0
              ? 'Select at least one goal'
              : `${data.goals.length} goal${data.goals.length > 1 ? 's' : ''} selected`}
          </motion.span>
        </div>

        <motion.button
          onClick={nextStep}
          disabled={!canContinue}
          whileHover={canContinue ? { scale: 1.02, y: -1 } : {}}
          whileTap={canContinue ? { scale: 0.98 } : {}}
          className={`w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 ${
            canContinue
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200 hover:shadow-xl'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
          <ArrowRight size={18} />
        </motion.button>
      </motion.div>
    </StepLayout>
  );
};

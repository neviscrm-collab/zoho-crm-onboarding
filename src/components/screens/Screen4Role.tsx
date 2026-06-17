import React from 'react';
import { motion } from 'framer-motion';
import { SelectionCard } from '../ui/SelectionCard';
import { StepLayout } from '../ui/StepLayout';
import { useOnboardingStore } from '../../store/onboardingStore';

const roles = [
  { label: 'Founder', icon: '🚀' },
  { label: 'CEO', icon: '👑' },
  { label: 'Sales Manager', icon: '📊' },
  { label: 'Sales Representative', icon: '🤝' },
  { label: 'Marketing Manager', icon: '📣' },
  { label: 'Operations Manager', icon: '⚙️' },
  { label: 'CRM Administrator', icon: '🛠️' },
  { label: 'Consultant', icon: '💼' },
];

export const Screen4Role: React.FC = () => {
  const { nextStep, prevStep, data, updateData, trackEvent } = useOnboardingStore();

  const select = (role: string) => {
    updateData({ role });
    trackEvent('role_selected', { role });
    setTimeout(nextStep, 200);
  };

  return (
    <StepLayout onBack={prevStep} stepKey="screen4">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 text-center">
          <span className="text-3xl block mb-3">👤</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">What's your role?</h2>
          <p className="text-gray-500">We'll tailor the dashboard and features for your needs.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {roles.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <SelectionCard
                label={r.label}
                icon={r.icon}
                selected={data.role === r.label}
                onClick={() => select(r.label)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </StepLayout>
  );
};

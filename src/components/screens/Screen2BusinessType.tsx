import React from 'react';
import { motion } from 'framer-motion';
import { SelectionCard } from '../ui/SelectionCard';
import { StepLayout } from '../ui/StepLayout';
import { useOnboardingStore } from '../../store/onboardingStore';

const businesses = [
  { label: 'Technology / SaaS', icon: '💻' },
  { label: 'Education', icon: '🎓' },
  { label: 'Healthcare', icon: '🏥' },
  { label: 'Real Estate', icon: '🏘️' },
  { label: 'Financial Services', icon: '💰' },
  { label: 'Manufacturing', icon: '🏭' },
  { label: 'Retail', icon: '🛍️' },
  { label: 'Consulting', icon: '💼' },
  { label: 'Marketing Agency', icon: '📣' },
  { label: 'Other', icon: '✦' },
];

export const Screen2BusinessType: React.FC = () => {
  const { nextStep, prevStep, data, updateData, trackEvent } = useOnboardingStore();

  const select = (type: string) => {
    updateData({ businessType: type });
    trackEvent('business_type_selected', { type });
    setTimeout(nextStep, 200);
  };

  return (
    <StepLayout onBack={prevStep} stepKey="screen2">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 text-center">
          <span className="inline-block text-3xl mb-3">🏢</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">What best describes your business?</h2>
          <p className="text-gray-500">We'll customize modules and workflows for your industry.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {businesses.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <SelectionCard
                label={b.label}
                icon={b.icon}
                selected={data.businessType === b.label}
                onClick={() => select(b.label)}
                size="md"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </StepLayout>
  );
};

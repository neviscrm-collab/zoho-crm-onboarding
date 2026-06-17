import React from 'react';
import { motion } from 'framer-motion';
import { useOnboardingStore } from '../../store/onboardingStore';
import { StepLayout } from '../ui/StepLayout';

const sizes = [
  { label: 'Just Me', icon: '🙋', desc: 'Solo operator' },
  { label: '2–5', icon: '👥', desc: 'Small team' },
  { label: '6–20', icon: '🏃', desc: 'Growing team' },
  { label: '21–50', icon: '🏢', desc: 'Mid-size' },
  { label: '51–200', icon: '🏙️', desc: 'Large team' },
  { label: '200+', icon: '🌐', desc: 'Enterprise' },
];

export const Screen5TeamSize: React.FC = () => {
  const { nextStep, prevStep, data, updateData } = useOnboardingStore();

  const select = (teamSize: string) => {
    updateData({ teamSize });
    setTimeout(nextStep, 200);
  };

  return (
    <StepLayout onBack={prevStep} stepKey="screen5">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 text-center">
          <span className="text-3xl block mb-3">👥</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">How many people will use Zoho CRM?</h2>
          <p className="text-gray-500">We'll scale features and permissions to fit your team.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {sizes.map((s, i) => (
            <motion.button
              key={s.label}
              onClick={() => select(s.label)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`
                p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer
                ${data.teamSize === s.label
                  ? 'border-indigo-500 bg-indigo-50 shadow-[0_0_0_2px_rgba(99,102,241,0.2)]'
                  : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md shadow-sm'
                }
              `}
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className={`font-bold text-lg ${data.teamSize === s.label ? 'text-indigo-700' : 'text-gray-800'}`}>
                {s.label}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{s.desc}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </StepLayout>
  );
};

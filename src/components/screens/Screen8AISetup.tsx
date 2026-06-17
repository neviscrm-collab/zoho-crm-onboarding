import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useOnboardingStore } from '../../store/onboardingStore';

const steps = [
  { label: 'Understanding your business', duration: 700 },
  { label: 'Configuring modules', duration: 600 },
  { label: 'Building sales process', duration: 700 },
  { label: 'Creating dashboards', duration: 600 },
  { label: 'Setting up automation', duration: 700 },
];

export const Screen8AISetup: React.FC = () => {
  const { nextStep, trackEvent } = useOnboardingStore();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cumulativeDelay = 400;
    steps.forEach((step, i) => {
      setTimeout(() => {
        setActiveStep(i);
        setTimeout(() => {
          setCompletedSteps(prev => [...prev, i]);
          if (i === steps.length - 1) {
            setTimeout(() => {
              setDone(true);
              trackEvent('recommendation_generated');
              setTimeout(nextStep, 800);
            }, 500);
          }
        }, step.duration);
      }, cumulativeDelay);
      cumulativeDelay += step.duration + 200;
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        {/* Animated orb */}
        <div className="relative mb-10 inline-block">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #6366f1)',
              padding: '3px',
            }}
          >
            <div className="w-full h-full rounded-full bg-indigo-950 flex items-center justify-center">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-3xl"
              >
                🤖
              </motion.span>
            </div>
          </motion.div>
          {/* Orbiting dots */}
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full bg-indigo-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
              style={{
                top: '50%',
                left: '50%',
                marginTop: -(12 + i * 8),
                marginLeft: -(12 + i * 8),
                transformOrigin: `${12 + i * 8}px ${12 + i * 8}px`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-3"
        >
          {done ? 'Your CRM is ready! 🎉' : 'Creating your personalized CRM'}
        </motion.h2>
        <p className="text-indigo-300 mb-10 text-base">
          {done ? 'Everything is configured and ready to go.' : 'AI is analyzing your responses...'}
        </p>

        {/* Steps */}
        <div className="space-y-3 text-left">
          {steps.map((step, i) => {
            const isCompleted = completedSteps.includes(i);
            const isActive = activeStep === i && !isCompleted;

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: i <= activeStep ? 1 : 0.3, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-400 ${
                  isCompleted ? 'bg-green-500' : isActive ? 'bg-indigo-400' : 'bg-white/10'
                }`}>
                  {isCompleted ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                      <Check size={13} className="text-white" strokeWidth={3} />
                    </motion.div>
                  ) : isActive ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-3 h-3 rounded-full border-2 border-white border-t-transparent"
                    />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white/30" />
                  )}
                </div>
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  isCompleted ? 'text-green-400' : isActive ? 'text-white' : 'text-white/40'
                }`}>
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-8 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: done ? '100%' : `${(completedSteps.length / steps.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
};

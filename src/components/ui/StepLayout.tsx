import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, X } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { useOnboardingStore } from '../../store/onboardingStore';

interface StepLayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
  showProgress?: boolean;
  stepKey: string;
}

const variants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export const StepLayout: React.FC<StepLayoutProps> = ({
  children, onBack, showProgress = true, stepKey,
}) => {
  const { currentStep, totalSteps, setStep } = useOnboardingStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Zoho CRM Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">Z</span>
            </div>
            <span className="font-semibold text-gray-800 text-sm hidden sm:block">Zoho CRM</span>
          </div>

          {/* Progress */}
          {showProgress && currentStep > 1 && (
            <div className="flex-1">
              <ProgressBar current={currentStep} total={totalSteps} />
            </div>
          )}

          {/* Skip */}
          {currentStep < totalSteps && (
            <button
              onClick={() => setStep(totalSteps)}
              className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 flex-shrink-0 transition-colors"
            >
              <X size={14} />
              <span className="hidden sm:inline">Skip setup</span>
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={stepKey}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Back nav */}
      {onBack && currentStep > 1 && (
        <div className="max-w-2xl mx-auto px-4 pb-4 w-full">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronLeft size={16} />
            Back
          </button>
        </div>
      )}
    </div>
  );
};

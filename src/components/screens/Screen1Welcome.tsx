import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Zap } from 'lucide-react';
import { useOnboardingStore } from '../../store/onboardingStore';

export const Screen1Welcome: React.FC = () => {
  const { nextStep, trackEvent } = useOnboardingStore();

  const handleStart = () => {
    trackEvent('onboarding_started');
    nextStep();
  };

  return (
    <div className="text-center">
      {/* Illustration */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="mb-8"
      >
        <div className="relative inline-block">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto shadow-2xl shadow-indigo-200">
            <Zap size={52} className="text-white" fill="white" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-base shadow-lg"
          >
            ✨
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Zoho CRM
          </span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
          Let's tailor your CRM experience so it feels built just for you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex items-center justify-center gap-6 mb-10 text-sm text-gray-400"
      >
        <div className="flex items-center gap-1.5">
          <Clock size={15} />
          <span>Under 90 seconds</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-gray-300" />
        <div className="flex items-center gap-1.5">
          <span>🎯</span>
          <span>No setup required</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-gray-300" />
        <div className="flex items-center gap-1.5">
          <span>⚡</span>
          <span>AI-powered</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="space-y-3"
      >
        <motion.button
          onClick={handleStart}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg rounded-2xl shadow-xl shadow-indigo-200 hover:shadow-2xl hover:shadow-indigo-300 transition-all duration-200"
        >
          Get Started
          <ArrowRight size={20} />
        </motion.button>

        <div>
          <button
            onClick={() => useOnboardingStore.getState().setStep(11)}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Skip — take me straight to CRM
          </button>
        </div>
      </motion.div>

      {/* Social proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-sm mx-auto"
      >
        <div className="flex -space-x-2 justify-center mb-2">
          {['🧑‍💼', '👩‍💼', '🧑‍💻', '👩‍🔬', '🧑‍🚀'].map((e, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-sm border-2 border-white">
              {e}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          <span className="font-semibold text-gray-700">250,000+ businesses</span> already personalized their CRM
        </p>
      </motion.div>
    </div>
  );
};

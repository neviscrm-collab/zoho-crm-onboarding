import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Settings, Layers, GitBranch, Zap, LayoutDashboard } from 'lucide-react';
import { StepLayout } from '../ui/StepLayout';
import { useOnboardingStore } from '../../store/onboardingStore';
import { generateRecommendation } from '../../lib/recommendations';

const Section: React.FC<{
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: string;
  delay: number;
}> = ({ icon, title, items, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
  >
    <div className="flex items-center gap-2 mb-3">
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <span className="font-semibold text-gray-800 text-sm">{title}</span>
      <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{items.length}</span>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {items.map(item => (
        <div key={item} className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
          <Check size={10} className="text-green-500 flex-shrink-0" strokeWidth={3} />
          <span className="text-xs text-gray-600">{item}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

export const Screen9Recommendation: React.FC = () => {
  const { nextStep, prevStep, data } = useOnboardingStore();
  const rec = generateRecommendation(data);

  return (
    <StepLayout onBack={prevStep} stepKey="screen9">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-6 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
            className="text-4xl mb-3"
          >
            🎉
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{rec.headline}</h2>
          <p className="text-gray-500 text-sm">{rec.description}</p>
        </div>

        {/* Industry badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="flex items-center justify-center gap-2 mb-5"
        >
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
            <span>⚡</span>
            Personalized for {data.businessType || 'your business'}
            {data.role && <span className="text-indigo-400">· {data.role}</span>}
          </span>
        </motion.div>

        {/* Recommendation sections */}
        <div className="space-y-3 mb-6">
          <Section
            icon={<Layers size={14} className="text-white" />}
            title="Modules"
            items={rec.modules}
            color="bg-indigo-500"
            delay={0.2}
          />
          <Section
            icon={<GitBranch size={14} className="text-white" />}
            title="Pipelines"
            items={rec.pipelines}
            color="bg-purple-500"
            delay={0.28}
          />
          <Section
            icon={<Zap size={14} className="text-white" />}
            title="Automations"
            items={rec.automations}
            color="bg-amber-500"
            delay={0.36}
          />
          <Section
            icon={<LayoutDashboard size={14} className="text-white" />}
            title="Dashboards"
            items={rec.dashboards}
            color="bg-emerald-500"
            delay={0.44}
          />
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52 }}
          className="space-y-3"
        >
          <motion.button
            onClick={nextStep}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200 hover:shadow-xl transition-all"
          >
            Accept Setup
            <ArrowRight size={18} />
          </motion.button>
          <button
            onClick={nextStep}
            className="w-full py-3 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 transition-all"
          >
            <Settings size={15} />
            Customize Setup
          </button>
        </motion.div>
      </motion.div>
    </StepLayout>
  );
};

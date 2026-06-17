import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface SelectionCardProps {
  label: string;
  icon?: string | React.ReactNode;
  selected?: boolean;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  multiSelect?: boolean;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  label, icon, selected, onClick, size = 'md', multiSelect,
}) => {
  const sizeClasses = {
    sm: 'p-3 text-sm',
    md: 'p-4 text-sm',
    lg: 'p-5 text-base',
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`
        relative w-full text-left rounded-2xl border-2 transition-all duration-200 cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2
        ${sizeClasses[size]}
        ${selected
          ? 'border-indigo-500 bg-indigo-50 shadow-[0_0_0_2px_rgba(99,102,241,0.2),0_8px_24px_rgba(99,102,241,0.12)]'
          : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md shadow-sm'
        }
      `}
      aria-pressed={selected}
      role={multiSelect ? 'checkbox' : 'radio'}
      aria-checked={selected}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <span className={`text-xl flex-shrink-0 ${selected ? 'scale-110' : ''} transition-transform duration-200`}>
            {icon}
          </span>
        )}
        <span className={`font-medium flex-1 ${selected ? 'text-indigo-700' : 'text-gray-700'}`}>
          {label}
        </span>
        {multiSelect && (
          <motion.div
            initial={false}
            animate={selected ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0"
          >
            <Check size={12} className="text-white" strokeWidth={3} />
          </motion.div>
        )}
      </div>
      {selected && !multiSelect && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center"
        >
          <Check size={11} className="text-white" strokeWidth={3} />
        </motion.div>
      )}
    </motion.button>
  );
};

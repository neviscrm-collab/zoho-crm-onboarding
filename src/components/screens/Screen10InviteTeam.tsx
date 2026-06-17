import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ArrowRight, Mail } from 'lucide-react';
import { StepLayout } from '../ui/StepLayout';
import { useOnboardingStore } from '../../store/onboardingStore';

const roleOptions = ['Admin', 'Sales Rep', 'Manager', 'Marketing', 'Viewer'];

interface Invite {
  email: string;
  role: string;
}

export const Screen10InviteTeam: React.FC = () => {
  const { nextStep, prevStep, data, updateData } = useOnboardingStore();
  const [invites, setInvites] = useState<Invite[]>(
    data.invites.length ? data.invites : [{ email: '', role: 'Sales Rep' }]
  );

  const update = (index: number, field: keyof Invite, value: string) => {
    const updated = [...invites];
    updated[index] = { ...updated[index], [field]: value };
    setInvites(updated);
  };

  const addInvite = () => setInvites([...invites, { email: '', role: 'Sales Rep' }]);
  const removeInvite = (i: number) => setInvites(invites.filter((_, idx) => idx !== i));

  const handleContinue = () => {
    const valid = invites.filter(inv => inv.email.includes('@'));
    updateData({ invites: valid });
    nextStep();
  };

  return (
    <StepLayout onBack={prevStep} stepKey="screen10">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 text-center">
          <span className="text-3xl block mb-3">👥</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Invite your team</h2>
          <p className="text-gray-500">Add teammates to get started together. You can always do this later.</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 mb-4">
          <AnimatePresence>
            {invites.map((invite, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-2 mb-3 last:mb-0"
              >
                <div className="relative flex-1">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={invite.email}
                    onChange={e => update(i, 'email', e.target.value)}
                    placeholder="colleague@company.com"
                    className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>
                <select
                  value={invite.role}
                  onChange={e => update(i, 'role', e.target.value)}
                  className="border border-gray-200 rounded-xl px-2 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-indigo-400 bg-white cursor-pointer"
                >
                  {roleOptions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                {invites.length > 1 && (
                  <motion.button
                    onClick={() => removeInvite(i)}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0 self-center"
                  >
                    <X size={15} />
                  </motion.button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {invites.length < 5 && (
            <motion.button
              onClick={addInvite}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3 w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-indigo-300 hover:text-indigo-500 flex items-center justify-center gap-1.5 transition-all"
            >
              <Plus size={15} />
              Add another
            </motion.button>
          )}
        </div>

        <div className="space-y-3">
          <motion.button
            onClick={handleContinue}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200 hover:shadow-xl transition-all"
          >
            Send Invites & Continue
            <ArrowRight size={18} />
          </motion.button>
          <button
            onClick={nextStep}
            className="w-full py-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </motion.div>
    </StepLayout>
  );
};

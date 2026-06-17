import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check, Globe, Building2, ArrowRight, Edit3 } from 'lucide-react';
import { StepLayout } from '../ui/StepLayout';
import { useOnboardingStore } from '../../store/onboardingStore';

const mockCompanies: Record<string, { logo: string; industry: string; description: string }> = {
  'zoho.com': { logo: '🔵', industry: 'Technology / SaaS', description: 'Zoho offers a comprehensive suite of business software.' },
  'salesforce.com': { logo: '☁️', industry: 'Technology / SaaS', description: 'Cloud-based CRM and enterprise software solutions.' },
  'hubspot.com': { logo: '🟠', industry: 'Marketing Agency', description: 'Inbound marketing, sales, and CRM platform.' },
  'apple.com': { logo: '🍎', industry: 'Technology / SaaS', description: 'Consumer electronics, software, and services.' },
  'amazon.com': { logo: '📦', industry: 'Retail', description: 'Global e-commerce and cloud computing giant.' },
};

const getCompanyFromDomain = (url: string) => {
  try {
    const domain = url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].toLowerCase();
    return mockCompanies[domain] || {
      logo: '🏢',
      industry: 'Business',
      description: `${domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1)} — a leading company in its space.`,
    };
  } catch {
    return null;
  }
};

export const Screen3CompanyDetails: React.FC = () => {
  const { nextStep, prevStep, data, updateData } = useOnboardingStore();
  const [name, setName] = useState(data.companyName || '');
  const [website, setWebsite] = useState(data.website || '');
  const [loading, setLoading] = useState(false);
  const [enriched, setEnriched] = useState<{ logo: string; industry: string; description: string } | null>(
    data.companyLogo ? { logo: data.companyLogo, industry: data.businessType, description: data.companyDescription || '' } : null
  );
  const [editing, setEditing] = useState(false);
  const websiteTimer = useRef<NodeJS.Timeout | null>(null);

  const handleWebsiteBlur = () => {
    if (!website || website.length < 4) return;
    setLoading(true);
    setEnriched(null);
    setTimeout(() => {
      const result = getCompanyFromDomain(website);
      if (result) {
        setEnriched(result);
        if (!name) setName(website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('.')[0]);
      }
      setLoading(false);
    }, 1400);
  };

  const handleWebsiteChange = (v: string) => {
    setWebsite(v);
    setEnriched(null);
    if (websiteTimer.current) clearTimeout(websiteTimer.current);
    if (v.includes('.') && v.length > 5) {
      websiteTimer.current = setTimeout(() => {
        setLoading(true);
        setTimeout(() => {
          const result = getCompanyFromDomain(v);
          if (result) {
            setEnriched(result);
            if (!name) setName(v.replace(/^https?:\/\//, '').replace(/^www\./, '').split('.')[0]);
          }
          setLoading(false);
        }, 1200);
      }, 800);
    }
  };

  const handleContinue = () => {
    updateData({
      companyName: name,
      website,
      companyLogo: enriched?.logo,
      companyDescription: enriched?.description,
    });
    nextStep();
  };

  const canContinue = name.trim().length >= 2;

  return (
    <StepLayout onBack={prevStep} stepKey="screen3">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 text-center">
          <span className="text-3xl block mb-3">🏢</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell us about your company</h2>
          <p className="text-gray-500">We'll use this to personalize your workspace.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
            <div className="relative">
              <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Acme Corp"
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Website URL <span className="text-gray-400 font-normal">(optional)</span></label>
            <div className="relative">
              <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={website}
                onChange={e => handleWebsiteChange(e.target.value)}
                onBlur={handleWebsiteBlur}
                placeholder="yourcompany.com"
                className="w-full pl-9 pr-10 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-sm"
              />
              {loading && (
                <Loader2 size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-indigo-400 animate-spin" />
              )}
              {enriched && !loading && (
                <Check size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-500" />
              )}
            </div>
          </div>

          {/* Enrichment Preview */}
          <AnimatePresence>
            {enriched && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl flex-shrink-0">
                    {enriched.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Check size={13} className="text-green-500 flex-shrink-0" />
                      <span className="text-xs font-semibold text-green-700">We found your company!</span>
                    </div>
                    {editing ? (
                      <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onBlur={() => setEditing(false)}
                        autoFocus
                        className="text-sm font-semibold text-gray-800 bg-white border border-gray-300 rounded-lg px-2 py-0.5 w-full"
                      />
                    ) : (
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-semibold text-gray-800 truncate">{name || website}</p>
                        <button onClick={() => setEditing(true)}>
                          <Edit3 size={12} className="text-gray-400 hover:text-gray-600" />
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">{enriched.description}</p>
                    <span className="inline-block mt-1.5 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      {enriched.industry}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-gray-500 py-2">
              <Loader2 size={14} className="animate-spin text-indigo-400" />
              Looking up your company...
            </motion.div>
          )}
        </div>

        <motion.button
          onClick={handleContinue}
          disabled={!canContinue}
          whileHover={canContinue ? { scale: 1.02, y: -1 } : {}}
          whileTap={canContinue ? { scale: 0.98 } : {}}
          className={`mt-6 w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 ${
            canContinue
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300'
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

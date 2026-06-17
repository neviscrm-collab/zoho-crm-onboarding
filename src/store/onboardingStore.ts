import { create } from 'zustand';

export interface OnboardingData {
  businessType: string;
  companyName: string;
  website: string;
  companyLogo?: string;
  companyDescription?: string;
  role: string;
  teamSize: string;
  goals: string[];
  currentCRM: string;
  contactCount?: number;
  migrationHelp?: boolean;
  invites: { email: string; role: string }[];
}

export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  data: OnboardingData;
  isCompleted: boolean;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (partial: Partial<OnboardingData>) => void;
  complete: () => void;
  reset: () => void;
  trackEvent: (event: string, properties?: Record<string, unknown>) => void;
}

const initialData: OnboardingData = {
  businessType: '',
  companyName: '',
  website: '',
  role: '',
  teamSize: '',
  goals: [],
  currentCRM: '',
  invites: [],
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  currentStep: 1,
  totalSteps: 11,
  data: initialData,
  isCompleted: false,

  setStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep, totalSteps } = get();
    if (currentStep < totalSteps) {
      set({ currentStep: currentStep + 1 });
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },

  updateData: (partial) =>
    set((state) => ({ data: { ...state.data, ...partial } })),

  complete: () => set({ isCompleted: true }),

  reset: () => set({ currentStep: 1, data: initialData, isCompleted: false }),

  trackEvent: (event, properties) => {
    console.log(`[Analytics] ${event}`, properties || {});
    // In production: send to analytics service
  },
}));

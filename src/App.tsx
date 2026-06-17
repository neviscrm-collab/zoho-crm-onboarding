import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useOnboardingStore } from './store/onboardingStore';
import { Screen1Welcome } from './components/screens/Screen1Welcome';
import { Screen2BusinessType } from './components/screens/Screen2BusinessType';
import { Screen3CompanyDetails } from './components/screens/Screen3CompanyDetails';
import { Screen4Role } from './components/screens/Screen4Role';
import { Screen5TeamSize } from './components/screens/Screen5TeamSize';
import { Screen6Goals } from './components/screens/Screen6Goals';
import { Screen7CurrentCRM } from './components/screens/Screen7CurrentCRM';
import { Screen8AISetup } from './components/screens/Screen8AISetup';
import { Screen9Recommendation } from './components/screens/Screen9Recommendation';
import { Screen10InviteTeam } from './components/screens/Screen10InviteTeam';
import { Screen11Ready } from './components/screens/Screen11Ready';

const screens: Record<number, React.FC> = {
  1: Screen1Welcome,
  2: Screen2BusinessType,
  3: Screen3CompanyDetails,
  4: Screen4Role,
  5: Screen5TeamSize,
  6: Screen6Goals,
  7: Screen7CurrentCRM,
  8: Screen8AISetup,
  9: Screen9Recommendation,
  10: Screen10InviteTeam,
  11: Screen11Ready,
};

function App() {
  const { currentStep } = useOnboardingStore();
  const Screen = screens[currentStep] || Screen1Welcome;

  return (
    <div className="font-sans">
      <AnimatePresence mode="wait">
        <Screen key={currentStep} />
      </AnimatePresence>
    </div>
  );
}

export default App;

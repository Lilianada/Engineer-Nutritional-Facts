import React, { useState, useRef } from 'react';
import LabelDisplay from './components/LabelDisplay';
import LabelActionBar from './components/LabelActionBar';
import CustomizationPanel from './components/CustomizationPanel';

import { CustomizationState, INITIAL_STATE } from './types/customization';




const App: React.FC = () => {
  const [customization, setCustomization] = useState<CustomizationState>(INITIAL_STATE);
  // Keep panel open by default on larger screens, allow toggle on smaller
  const [isPanelOpen, setIsPanelOpen] = useState(window.innerWidth >= 768); 
  const labelRef = useRef<HTMLDivElement>(null);


  // Effect to handle resize (optional, but good UX)
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsPanelOpen(true); // Ensure panel is open on resize to desktop
      }
    };
    window.addEventListener('resize', handleResize);
    // Initial check in case window is already desktop size
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
    <div className="min-h-screen bg-gray-200 flex flex-row">

      {/* Customization Panel*/}
      <CustomizationPanel 
        customization={customization} 
        setCustomization={setCustomization}
        isOpen={isPanelOpen} 
        setIsOpen={setIsPanelOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
        {/* Button to toggle panel on mobile (only show if panel is closed) */}
        {!isPanelOpen && (
          <button 
            onClick={() => setIsPanelOpen(true)}
            className={`fixed top-4 left-4 z-30 p-2 bg-blue-600 text-white rounded-md shadow-md md:hidden`}
            aria-label="Open customization panel"
          >
            Customize
          </button>
        )}

        {/* Label Action Bar (Download/Share) */}
        <div className="w-full max-w-md mb-2">
          <LabelActionBar labelRef={labelRef} headerText={customization.headerText} />
        </div>
        {/* Label Display Area */}
        <div className="w-full max-w-md mb-6 transition-transform duration-300 ease-in-out md:scale-105 lg:scale-110">
            <LabelDisplay customization={customization} labelRef={labelRef} />
        </div>
      </main>
    </div>
  );
}

export default App;

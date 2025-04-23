import React, { useState, useRef } from 'react';
import LabelDisplay from './components/LabelDisplay';
import LabelActionBar from './components/LabelActionBar';
import CustomizationPanel from './components/CustomizationPanel';
import DesktopPanel from './components/DesktopPanel';
import { CustomizationState, INITIAL_STATE } from './types/customization';


const App: React.FC = () => {
  const [customization, setCustomization] = useState<CustomizationState>(INITIAL_STATE);
  // Keep panel open by default on larger screens, allow toggle on smaller
  const [isPanelOpen, setIsPanelOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return false;
  }); // Closed by default on mobile
  const labelRef = useRef<HTMLDivElement>(null);

  // Shared handler functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Omit<CustomizationState, 'facts' | 'colors' | 'fonts'>) => {
    setCustomization((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleFactChange = (index: number, field: keyof import('./types/customization').Fact, value: string | number) => {
    setCustomization((prev) => {
      const newFacts = [...prev.facts];
      const processedValue = field === 'value' ? (parseInt(value as string, 10) || 0) : value;
      const updatedFact = { ...newFacts[index], [field]: processedValue };
      newFacts[index] = updatedFact;
      return { ...prev, facts: newFacts };
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof CustomizationState['colors']) => {
    setCustomization((prev) => ({
      ...prev,
      colors: { ...prev.colors, [field]: e.target.value }
    }));
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>, field: keyof CustomizationState['fonts']) => {
    setCustomization((prev) => ({
      ...prev,
      fonts: { ...prev.fonts, [field]: e.target.value }
    }));
  };

  // Effect to handle resize (optional, but good UX)
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsPanelOpen(true); // Open on desktop
      } else {
        setIsPanelOpen(false); // Closed on mobile
      }
    };
    window.addEventListener('resize', handleResize);
    // Initial check in case window is already desktop size
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col md:flex-row">
      {/* Customization Panel (Mobile overlay, hidden on md+) */}
      <CustomizationPanel
        customization={customization}
        setCustomization={setCustomization}
        isOpen={isPanelOpen}
        setIsOpen={setIsPanelOpen}
        handleInputChange={handleInputChange}
        handleFactChange={handleFactChange}
        handleColorChange={handleColorChange}
        handleFontChange={handleFontChange}
      />

      {/* Desktop Layout: DesktopPanel 40%, Label Display Area 60% */}
      <div className="flex-1 flex flex-col md:flex-row ">
        {/* Fixed, scrollable sidebar on the left (desktop only) */}
        <div className="hidden md:block fixed inset-y-0 left-0 w-[28rem] bg-white shadow-lg overflow-y-auto z-30">
          <DesktopPanel
            customization={customization}
            setCustomization={setCustomization}
            handleInputChange={handleInputChange}
            handleFactChange={handleFactChange}
            handleColorChange={handleColorChange}
            handleFontChange={handleFontChange}
          />
        </div>
        {/* Main area: label preview, centered */}
        <main className="flex-1 flex flex-col items-center justify-center  md:p-8 md:ml-[28rem] min-h-screen gap-3">
          {/* Button to toggle panel on mobile (only show if panel is closed) */}
          {!isPanelOpen && (
            <button
              onClick={() => setIsPanelOpen(true)}
              className={`block fixed top-4 left-4 z-30 p-2 bg-blue-600 text-white rounded-md shadow-md md:hidden`}
              aria-label="Open customization panel"
            >
              Customize
            </button>
          )}
          {/* Label Action Bar (Download/Share) */}
          <div className="w-full max-w-md mr-8">
            <LabelActionBar labelRef={labelRef} headerText={customization.headerText} />
          </div>
          {/* Label Display Area */}
          <div className="w-full max-w-md p-2 transition-transform duration-300 ease-in-out md:scale-105 lg:scale-110 mx-auto">
            <LabelDisplay customization={customization} labelRef={labelRef} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

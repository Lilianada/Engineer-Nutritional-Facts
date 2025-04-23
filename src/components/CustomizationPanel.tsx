import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomizationState, Fact, FONT_OPTIONS } from '../types/customization';

interface CustomizationPanelProps {
  customization: CustomizationState;
  setCustomization: React.Dispatch<React.SetStateAction<CustomizationState>>;
  isOpen: boolean; // For controlling modal/sidebar visibility
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // To close the panel
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof Omit<CustomizationState, 'facts' | 'colors' | 'fonts'>) => void;
  handleFactChange: (index: number, field: keyof Fact, value: string | number) => void;
  handleColorChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof CustomizationState['colors']) => void;
  handleFontChange: (e: React.ChangeEvent<HTMLSelectElement>, field: keyof CustomizationState['fonts']) => void;
}

// Reusable Input Component for cleaner code
interface InputFieldProps {
    label: string;
    id: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    step?: string; // For number inputs
    min?: string; // For number inputs
}

const InputField: React.FC<InputFieldProps> = ({ label, id, value, onChange, type = 'text', ...props }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input 
            type={type} 
            id={id} 
            value={value} 
            onChange={onChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
            {...props} 
        />
    </div>
);

// Reusable Select Component
interface SelectFieldProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, id, value, onChange, options }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select 
            id={id} 
            value={value} 
            onChange={onChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white transition duration-150 ease-in-out"
        >
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

// Reusable Color Picker Component
interface ColorPickerProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, id, value, onChange }) => (
     <div className="mb-4 flex items-center justify-between">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <input 
            type="color" 
            id={id} 
            value={value} 
            onChange={onChange} 
            className="w-10 h-10 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            aria-label={`Select ${label} color`}
        />
    </div>
);

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ 
  customization, 
  setCustomization, 
  isOpen, 
  setIsOpen, 
  handleInputChange, 
  handleFactChange, 
  handleColorChange, 
  handleFontChange 
}) => {
  // Only hide the panel on mobile if not open; always show on desktop
  return (
    <>
      {/* Mobile: Animated Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-sidebar"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm h-full bg-white shadow-2xl overflow-y-auto"
              style={{ maxWidth: 400 }}
            >
              <div className="p-6">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full z-40"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close panel"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Customize Label</h2>
                
                {/* Text Fields */}
                <section className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Text Content</h3>
                  <InputField label="Header Text" id="headerText" value={customization.headerText} onChange={(e) => handleInputChange(e, 'headerText')} />
                  <InputField label="Subtitle Text" id="subtitleText" value={customization.subtitleText} onChange={(e) => handleInputChange(e, 'subtitleText')} />
                  <InputField label="Footer Text 1" id="footerText1" value={customization.footerText1} onChange={(e) => handleInputChange(e, 'footerText1')} />
                  <InputField label="Footer Text 2" id="footerText2" value={customization.footerText2} onChange={(e) => handleInputChange(e, 'footerText2')} />
                </section>

                {/* Facts/Values Fields */}
                <section className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Facts & Values</h3>
                  {customization.facts.map((fact, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 mb-3 p-2 border border-gray-200 rounded">
                      <div className="col-span-2">
                        <label htmlFor={`fact-label-${index}`} className="sr-only">Fact Label {index + 1}</label>
                        <input 
                          type="text" 
                          id={`fact-label-${index}`} 
                          value={fact.label} 
                          onChange={(e) => handleFactChange(index, 'label', e.target.value)} 
                          className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                          placeholder="Fact Label"
                        />
                      </div>
                      <div>
                        <label htmlFor={`fact-value-${index}`} className="sr-only">Fact Value {index + 1}</label>
                        <input 
                          type="number" 
                          id={`fact-value-${index}`} 
                          value={fact.value} 
                          onChange={(e) => handleFactChange(index, 'value', e.target.value)} 
                          className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                          placeholder="Value %"
                          min="0"
                        />
                      </div>
                    </div>
                  ))}
                </section>

                {/* Color Pickers */}
                <section className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Colors</h3>
                  <ColorPicker label="Background" id="bgColor" value={customization.colors.background} onChange={(e) => handleColorChange(e, 'background')} />
                  <ColorPicker label="Text Color" id="textColor" value={customization.colors.text} onChange={(e) => handleColorChange(e, 'text')} />
                  <ColorPicker label="Highlight Color" id="highlightColor" value={customization.colors.highlight} onChange={(e) => handleColorChange(e, 'highlight')} />
                </section>

                {/* Font Selectors */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Fonts</h3>
                  <SelectField label="Header Font" id="headerFont" value={customization.fonts.headerFamily} onChange={(e) => handleFontChange(e, 'headerFamily')} options={FONT_OPTIONS.header} />
                  <SelectField label="Label Font" id="labelFont" value={customization.fonts.labelFamily} onChange={(e) => handleFontChange(e, 'labelFamily')} options={FONT_OPTIONS.label} />
                  <SelectField label="Value Font" id="valueFont" value={customization.fonts.valueFamily} onChange={(e) => handleFontChange(e, 'valueFamily')} options={FONT_OPTIONS.value} />
                </section>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop: Fixed, Scrollable Sidebar (always visible on md+) */}
    
    </>
  );
};

export default CustomizationPanel;
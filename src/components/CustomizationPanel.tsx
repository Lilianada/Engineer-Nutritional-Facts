import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileSidebar from './MobileSidebar';
import PanelContent from './PanelContent';
import { CustomizationState, Fact } from '../types/customization';

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

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  customization,
  setCustomization,
  isOpen,
  setIsOpen,
  handleInputChange,
  handleFactChange,
  handleColorChange,
  handleFontChange,
}) => {
  return (
    <>
      {/* Mobile: Animated Drawer */}
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen}>
        <PanelContent
          customization={customization}
          handleInputChange={handleInputChange}
          handleFactChange={handleFactChange}
          handleColorChange={handleColorChange}
          handleFontChange={handleFontChange}
        />
      </MobileSidebar>
    </>
  );
};

export default CustomizationPanel;
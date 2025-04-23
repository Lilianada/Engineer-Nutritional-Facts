import React from 'react';
import TextContentSection from './TextContentSection';
import FactsSection from './FactsSection';
import ColorsSection from './ColorsSection';
import FontsSection from './FontsSection';
import { CustomizationState, Fact } from '../types/customization';

interface PanelContentProps {
  customization: CustomizationState;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof Omit<CustomizationState, 'facts' | 'colors' | 'fonts'>) => void;
  handleFactChange: (index: number, field: keyof Fact, value: string | number) => void;
  handleColorChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof CustomizationState['colors']) => void;
  handleFontChange: (e: React.ChangeEvent<HTMLSelectElement>, field: keyof CustomizationState['fonts']) => void;
}

const PanelContent: React.FC<PanelContentProps> = ({
  customization,
  handleInputChange,
  handleFactChange,
  handleColorChange,
  handleFontChange,
}) => (
  <div className="p-6">
    <h2 className="text-xl font-bold text-gray-800 mb-6">Customize Label</h2>
    <TextContentSection customization={customization} handleInputChange={handleInputChange} />
    <FactsSection customization={customization} handleFactChange={handleFactChange} />
    <ColorsSection customization={customization} handleColorChange={handleColorChange} />
    <FontsSection customization={customization} handleFontChange={handleFontChange} />
  </div>
);

export default PanelContent;

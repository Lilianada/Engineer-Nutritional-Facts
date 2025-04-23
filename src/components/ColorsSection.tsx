import React from 'react';
import { CustomizationState } from '../types/customization';
import ColorPicker from './ColorPicker';

interface Props {
  customization: CustomizationState;
  handleColorChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof CustomizationState['colors']) => void;
}

const ColorsSection: React.FC<Props> = ({ customization, handleColorChange }) => (
  <section className="mb-6">
    <h3 className="text-lg font-semibold text-gray-700 mb-3">Colors</h3>
    <ColorPicker label="Background" id="bgColor" value={customization.colors.background} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleColorChange(e, 'background')} />
    <ColorPicker label="Text Color" id="textColor" value={customization.colors.text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleColorChange(e, 'text')} />
    <ColorPicker label="Highlight Color" id="highlightColor" value={customization.colors.highlight} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleColorChange(e, 'highlight')} />
  </section>
);

export default ColorsSection;

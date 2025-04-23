import React from 'react';
import { CustomizationState, FONT_OPTIONS } from '../types/customization';
import SelectField from './SelectField';

interface Props {
  customization: CustomizationState;
  handleFontChange: (e: React.ChangeEvent<HTMLSelectElement>, field: keyof CustomizationState['fonts']) => void;
}

const FontsSection: React.FC<Props> = ({ customization, handleFontChange }) => (
  <section>
    <h3 className="text-lg font-semibold text-gray-700 mb-3">Fonts</h3>
    <SelectField label="Header Font" id="headerFont" value={customization.fonts.headerFamily} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFontChange(e, 'headerFamily')} options={FONT_OPTIONS.header} />
    <SelectField label="Label Font" id="labelFont" value={customization.fonts.labelFamily} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFontChange(e, 'labelFamily')} options={FONT_OPTIONS.label} />
    <SelectField label="Value Font" id="valueFont" value={customization.fonts.valueFamily} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFontChange(e, 'valueFamily')} options={FONT_OPTIONS.value} />
  </section>
);

export default FontsSection;

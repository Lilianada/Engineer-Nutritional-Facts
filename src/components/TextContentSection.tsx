import React from 'react';
import { CustomizationState } from '../types/customization';
import InputField from './InputField';

interface Props {
  customization: CustomizationState;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof Omit<CustomizationState, 'facts' | 'colors' | 'fonts'>) => void;
}

const TextContentSection: React.FC<Props> = ({ customization, handleInputChange }) => (
  <section className="mb-6">
    <h3 className="text-lg font-semibold text-gray-700 mb-3">Text Content</h3>
    <InputField label="Header Text" id="headerText" value={customization.headerText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'headerText')} />
    <InputField label="Subtitle Text" id="subtitleText" value={customization.subtitleText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'subtitleText')} />
    <InputField label="Footer Text 1" id="footerText1" value={customization.footerText1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'footerText1')} />
    <InputField label="Footer Text 2" id="footerText2" value={customization.footerText2} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'footerText2')} />
  </section>
);

export default TextContentSection;

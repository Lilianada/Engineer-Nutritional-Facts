import React from 'react';
import { CustomizationState, Fact } from '../types/customization';

interface Props {
  customization: CustomizationState;
  handleFactChange: (index: number, field: keyof Fact, value: string | number) => void;
}

const FactsSection: React.FC<Props> = ({ customization, handleFactChange }) => (
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
);

export default FactsSection;

import React from 'react';

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

export default ColorPicker;

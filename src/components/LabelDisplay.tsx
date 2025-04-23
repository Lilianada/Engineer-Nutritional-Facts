import React from 'react';
import { CustomizationState } from '../types/customization';


interface LabelDisplayProps {
  customization: CustomizationState;
  labelRef: React.RefObject<HTMLDivElement | null>;
}





const LabelDisplay: React.FC<LabelDisplayProps> = ({ customization, labelRef }) => {


  const {
    headerText,
    subtitleText,
    facts,
    footerText1,
    footerText2,
    colors,
    fonts,
  } = customization;

  const textStyle = { color: colors.text };
  const headerStyle = { ...textStyle, fontFamily: fonts.headerFamily };
  const labelStyle = { ...textStyle, fontFamily: fonts.labelFamily };
  const valueStyle = { ...textStyle, fontFamily: fonts.valueFamily };
  const highlightStyle = { backgroundColor: colors.highlight };


  return (
    <div
      ref={labelRef}
      className="p-4 border-2 border-black w-full max-w-md shadow-md relative"
      style={{ backgroundColor: colors.background }}
    >

      {/* Main label content, padded to avoid overlap with buttons */}
      <div className="pt-12">
        <h1 className="text-4xl font-extrabold mb-0 leading-tight" style={headerStyle}>
          {headerText}
        </h1>
        <p className="text-sm font-semibold mb-1" style={labelStyle}>{subtitleText}</p>
        <div className="h-2 w-full mb-1" style={highlightStyle}></div>
        <div className="flex justify-between items-baseline mb-1 border-b border-black pb-1">
          <p className="text-sm font-semibold" style={labelStyle}>Amount Per Serving (un)</p>
        </div>
        <div className="flex justify-end items-baseline mb-1 border-b-4 border-black pb-1">
          <p className="text-sm font-bold" style={labelStyle}>% Daily Value*</p>
        </div>

        <div className="mb-2">
          {facts.map((fact, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-400 py-1"
            >
              <span className="font-medium" style={labelStyle}>{fact.label}</span>
              <span className="font-bold" style={valueStyle}>{fact.value}%</span>
            </div>
          ))}
        </div>

        <div className="h-1 w-full mb-2" style={highlightStyle}></div>
        <p className="text-xs mb-1" style={labelStyle}>{footerText1}</p>
        <p className="text-xs mb-2" style={labelStyle}>{footerText2}</p>
        <p className="text-xs text-center pt-2 border-t border-gray-300" style={labelStyle}>Made in Lily's Lab</p>
      </div>
    </div>
  );
};

export default LabelDisplay;
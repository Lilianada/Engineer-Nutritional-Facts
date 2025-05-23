import React from 'react';
import html2canvas from 'html2canvas';

interface Fact {
  label: string;
  value: number | string;
}

interface Customization {
  headerText: string;
  subtitleText: string;
  facts: Fact[];
  footerText1: string;
  footerText2: string;
  colors: {
    text: string;
    background: string;
    highlight: string;
  };
  fonts: {
    headerFamily: string;
    labelFamily: string;
    valueFamily: string;
  };
}

interface LabelDisplayProps {
  customization: Customization;
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
    <div ref={labelRef} className="p-4 rounded-md bg-white border border-1 border-black">
      <div
        className="p-4 border-2 border-black w-full max-w-md relative"
        style={{ backgroundColor: colors.background }}
      >
          <h1 className="text-4xl font-extrabold leading-tight" style={headerStyle}>
            {headerText}
          </h1>
          <p className="text-sm font-semibold mb-1" style={labelStyle}>{subtitleText}</p>
          <div className="flex justify-between items-baseline mb-1 border-b-4 border-black pb-1"></div>
          <div className="flex justify-between items-baseline mb-1 border-b border-black pb-1">
            <p className="text-sm font-semibold" style={labelStyle}>Amount Per Serving (un)</p>
          </div>
          <div className="flex justify-end items-baseline mb-1 border-b-4 border-black pb-1">
            <p className="text-sm font-bold" style={labelStyle}>% Daily Value **</p>
          </div>

          <div className="mb-2">
            {Array.isArray(facts) && facts.map((fact, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-400 py-1"
              >
                <span className="font-medium" style={labelStyle}>{fact.label}</span>
                <span className="font-bold" style={valueStyle}>{fact.value}%</span>
              </div>
            ))}
          </div>

          <div className="flex justify-end items-baseline mb-1 border-b-4 border-black pb-1"></div>
          <p className="text-xs mb-1" style={labelStyle}>{footerText1}</p>
          <p className="text-xs mb-2" style={labelStyle}>{footerText2}</p>
          <p className="text-xs text-center pt-2 border-t border-gray-300" style={labelStyle}>Made in Lilyslab.xyz</p>
        </div>
      </div>
  );
};

export default LabelDisplay;

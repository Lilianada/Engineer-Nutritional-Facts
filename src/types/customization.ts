export interface Fact {
  label: string;
  value: number; // Percentage
}

export interface CustomizationState {
  headerText: string;
  subtitleText: string;
  facts: Fact[];
  footerText1: string;
  footerText2: string;
  colors: {
    background: string;
    text: string;
    highlight: string;
  };
  fonts: {
    labelFamily: string;
    valueFamily: string;
    headerFamily: string; // Added for header font customization
  };
}

// Define available fonts
export const FONT_OPTIONS = {
  header: ['Poppins', 'Raleway', 'Oswald'],
  label: ['Roboto', 'Lato', 'Montserrat'],
  value: ['Open Sans', 'Source Sans Pro', 'Nunito'],
};

// Initial state based on the image
export const INITIAL_STATE: CustomizationState = {
  headerText: "Engineer",
  subtitleText: "Nutritional and Undeniable Facts",
  facts: [
    { label: "Hard Working", value: 100 },
    { label: "Problem Solving", value: 100 },
    { label: "Critical Thinking", value: 1100 },
    { label: "Mathematician", value: 200 },
    { label: "Adequate Sleep (h)", value: 0 },
    { label: "Wrong Answers", value: 0 },
  ],
  footerText1: "* Not a significant source of correct grammar.",
  footerText2: '** See also "Ninja" ou "Magician"',
  colors: {
    background: "#FFFFFF", // White
    text: "#000000", // Black
    highlight: "#000000", // Black
  },
  fonts: {
    headerFamily: 'Poppins', // Default header font
    labelFamily: 'Roboto', // Default label font
    valueFamily: 'Open Sans', // Default value font
  },
}; 
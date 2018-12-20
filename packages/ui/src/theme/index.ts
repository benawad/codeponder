export interface ITheme {
  /**
   * Fonts according to design spec, can be accessed using `fontFamily="key"` in component props
   */
  fonts: {
    [key: string]: string;
  };

  /**
   * Font-sizes according to design spec, can be accessed using `fontSize={index}` in component props
   */
  fontSizes: string[];

  /**
   * Colours according to design spec, can be accessed using `color={index}`/`color={index[]}` and `bg={index[]}`/`bg={index[]}` in component props
   */
  colors: {
    [key: string]: string[];
  };

  /**
   * Border-radii according to design spec, can be accessed using `borderRadius={index}` in component props
   */
  radii: string[];

  /**
   * spacing according to design spec, can be accessed using the `m(t|r|b|l)` and `p(t|r|b|l)` props with the corresponding index
   */
  space: string[];

  textStyles?: {
    [key: string]: {};
  };

  colorStyles?: {
    [key: string]: {};
  };

  buttons: {
    [key: string]: {};
  };
}

const theme: ITheme = {
  fonts: {
    sans: '"Rubik", sans-serif',
    mono: '"Roboto Mono", sans-serif',
  },
  fontSizes: ["8px", "10px", "12px", "13px", "14px", "16px", "18px"],
  colors: {
    primary: [
      "#07385A",
      "#184F76",
      "#3290D4",
      "#6DC1FD",
      "#A7DAFF",
      "#E2F3FF",
      "#F3FAFF",
    ],
    neutrals: [
      "#263238",
      "#78909C",
      "#B7C1C6",
      "#E6EAEF",
      "#F9FBFD",
      "#FFFFFF",
    ],
    errors: ["#7A1414", "#BE0A0A", "#FF4F4F", "#FFC6C6", "#FFF3F3"],
    warnings: ["#684B00", "#CC9C23", "#FFCB44", "#FFE6A6", "#FFF8E7"],
    success: ["#07822A", "#49B267", "#67D987", "#AEF1C1", "#E1FFE9"],
  },
  radii: ["3px", "4px", "5px", "6px"],
  space: ["4px", "6px", "8px", "10px", "14px"],
  buttons: {
    primary: {
      backgroundColor: "#6DC1FD",
      color: "#ffffff",
      margin: "0 10px",
      fontSize: "14px",
      padding: "8px 10px",
      textTransform: "uppercase",
      borderRadius: "4px",
    },
    topic: {
      backgroundColor: "#E2F3FF",
      color: "#3290D4",
      borderRadius: "3px",
      fontSize: "8px",
      padding: "4px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#F3FAFF",
      },
      "&:not(:first-child)": {
        marginLeft: "10px",
      },
    },
    github: {
      display: "flex",
      backgroundColor: "rgb(22, 23, 26)",
      color: "#fff",
      alignItems: "center",
      fontSize: "12px",
      fontFamily: "rubik",
      cursor: "pointer",
    },
  },
};
export default theme;

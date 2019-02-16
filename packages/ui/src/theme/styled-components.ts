// styled-components.ts
import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";
import { ITheme } from ".";

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ITheme>;

export { css, createGlobalStyle, keyframes, ThemeProvider, styled };
export default styled;
export const GlobalStyle = createGlobalStyle`
body {
  background-color: #F9FBFD;
  font-size: 1.5rem;
  font-family: rubik;
}

* {
  outline: none;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-size: 62.5%;
}

a {
  text-decoration: none;
}
`;

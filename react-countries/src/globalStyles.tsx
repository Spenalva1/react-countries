import styled, { createGlobalStyle } from 'styled-components';
import { Theme, useTheme } from './theme-context';

const GlobalStyles = createGlobalStyle`
  html {
    --darkBlue: hsl(209, 23%, 22%);          //(Dark Mode Elements)
    --veryDarkBlue: hsl(207, 26%, 17%);      // (Dark Mode Background)
    --veryDarkBlue: hsl(200, 15%, 8%);       // (Light Mode Text)
    --darkGray: hsl(0, 0%, 52%);             //(Light Mode Input)
    --veryLightGray: hsl(0, 0%, 98%);        // (Light Mode Background)
    --white: hsl(0, 0%, 100%);               //(DarkMode Text & Light Mode Elements)
    --maxWidth: 1200px;
    --bs: 0px 0px 25px -7px rgba(0, 0, 0, 0.25);
    --themeTransition: 0.3s ease-in-out;
    font-size: 62.5%;
  }
  *, *:before, *:after {
    box-sizing: border-box;
    box-sizing: inherit;
    margin: 0;
  }
  body {
    background: ${({ theme }: { theme: Theme }) => theme.bg};
    transition: background var(--themeTransition);
    padding: 0;
    margin: 0;
    font-size: 1.4rem;
    line-height: 2;
    font-family: 'Nunito Sans', sans-serif;
  }
  button {
    font-family: 'Nunito Sans', sans-serif;
    cursor: pointer;
  }
`;

export const Global = () => {
  const { theme } = useTheme();
  return <GlobalStyles theme={theme} />;
};

export const ContainerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 3rem;
`;

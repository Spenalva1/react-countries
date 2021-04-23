import styled, {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html {
    --darkBlue: hsl(209, 23%, 22%);          //(Dark Mode Elements)
    --veryDarkBlue: hsl(207, 26%, 17%);      // (Dark Mode Background)
    --veryDarkBlue: hsl(200, 15%, 8%);       // (Light Mode Text)
    --darkGray: hsl(0, 0%, 52%);             //(Light Mode Input)
    --veryLightGray: hsl(0, 0%, 98%);        // (Light Mode Background)
    --white: hsl(0, 0%, 100%);               //(DarkMode Text & Light Mode Elements)
    --maxWidth: 1000px;
    font-size: 62.5%;
  }
  *, *:before, *:after {
    box-sizing: border-box;
    box-sizing: inherit;
    margin: 0;
  }
  body {
    background: var(--veryLightGray);
    padding: 0;
    margin: 0;
    font-size: 1.4rem;
    line-height: 2;
    font-family: 'Nunito Sans', sans-serif;
  }
`;


export const ContainerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2.5rem;
`;
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  body {
    margin: 0;
    padding: 0;
    font-family: Roboto, Helvetica, Sans-Serif;
  }
`;

export default GlobalStyle;
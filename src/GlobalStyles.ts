import { createGlobalStyle } from 'styled-components';

export const light = {
  text: '#1D2125',
  background: 'white',
  hover: '#F8FAFD',
  selected: '#dee4ea',
  border: '#C7D1DB',
  borderDark: '#738496',
  shadow: '#DEE4EA',
}

export const dark = {
  text: '#dee4ea',
  background: '#1d2125',
  hover: '#262B30',
  selected: '#3A4148',
  border: '#2C333A',
  borderDark: '#696B7D',
  shadow: '#23263E',
}


const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  body {
    margin: 0;
    padding: 0;
    font-family: Roboto, Helvetica, Sans-Serif;
  }
`;

export default GlobalStyle;
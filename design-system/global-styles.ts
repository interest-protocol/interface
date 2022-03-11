import { css } from '@emotion/react';

const GlobalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }

  body {
    overflow-x: hidden;
  }

  ul,
  li {
    list-style-type: '· ';
  }

  a {
    text-decoration: none;
  }
  br {
    display: none;
  }
  @media (min-width: 40em) {
    br {
      display: initial;
    }
  }
`;

export default GlobalStyles;

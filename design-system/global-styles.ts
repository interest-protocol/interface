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

  body,
  html {
    overflow-x: hidden;
  }

  ul,
  li {
    list-style-type: '· ';
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  br {
    display: none;
  }
  .breakMobile {
    display: block;
  }
  @media (min-width: 40em) {
    br {
      display: initial;
    }
  }
`;

export default GlobalStyles;

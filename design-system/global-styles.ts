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
  a:hover {
    text-decoration: underline;
  }

  br {
    display: none;
  }
  .breakMobile {
    display: block;
  }
  .__react_component_tooltip .multi-line {
    text-align: left !important;
  }
  @media (min-width: 40em) {
    br {
      display: initial;
    }
  }
`;

export default GlobalStyles;

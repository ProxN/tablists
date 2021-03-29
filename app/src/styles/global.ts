import { createGlobalStyle, css } from 'styled-components';
import ResetStyles from './reset';

const GlobalStyles = createGlobalStyle`
    ${ResetStyles}
  *,
    *::before,
    *::after{
        margin:0;
        padding:0;
        box-sizing:inherit;
    }
    
    html{
        box-sizing:border-box;
        height:100%;
        width:100%;
        font-size:10px;
    }
    
    #__next,
    body{
        width:100%;
        height:100%;
    }

    body{
        font-weight:normal;
        line-height:1.35;
        ${({ theme }) => css`
          background-color: ${theme.colors.bg.light};
          color: ${theme.colors.text};
          font-size: ${theme.fontSizeBase};
          font-weight: ${theme.fontWeights[0]};
          font-family: ${theme.fontFamily};
        `};
    }

    a{
        text-decoration:none;
    }

    ul {
        list-style:none;
    }

    h1,h2,h3,h4,h5,h6{
        font-weight: 700;
        line-height: 1.5;
        letter-spacing: 0.02em;
        margin-bottom: 1.4rem;
        margin:0;
    }


    h1 {
    font-size: 4rem;
    line-height: 1.1;
    }

    h2 {
    font-size: 3.6rem;
    line-height: 1.23;
    }

    h3 {
    font-size: 2.6rem;
    }

    h4 {
    font-size: 2.2rem;
    }

    h5 {
    font-size: 2rem;
    }

    h6 {
    font-size: 1.6rem;
    }
    
`;

export default GlobalStyles;

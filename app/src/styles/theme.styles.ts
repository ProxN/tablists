import { DefaultTheme } from 'styled-components';

const fontFamily = "'Poppins', Helvetica, sans-serif";
const fontWeights = [400, 500, 700];

const colors = {
  primary: {
    light: '#6B97F7',
    main: '#5C8DF7',
    dark: '#5480E0',
  },
  default: {
    light: '#CACACA',
    main: '#C1C1C1',
    dark: '#9E9E9E',
  },
  bg: {
    light: '#F2F7FB',
    main: '#ffffff',
    dark: '#EBF3FA',
  },
  danger: {
    light: '#EA675A',
    main: '#E74C3C',
    dark: '#D04536',
  },
  success: {
    light: '#4ED486',
    main: '#2ECC71',
    dark: '#29B766',
  },
  text: 'rgba(0,0,0,.85)',
  invertText: '#fff',
};

const Theme: DefaultTheme = {
  colors,
  fontFamily,
  fontWeights,
  borderRadius: 12,
  fontSizeBase: '1.4rem',
};

export default Theme;

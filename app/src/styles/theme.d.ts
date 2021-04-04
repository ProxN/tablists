import 'styled-components';

type IColor = {
  light: string;
  main: string;
  dark: string;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: IColor;
      bg: IColor;
      danger: IColor;
      text: string;
      invertText: string;
    };
    fontSizeBase: '1.4rem';
    fontWeights: number[];
    fontFamily: string;
    borderRadius: number;
  }
}

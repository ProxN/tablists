import 'styled-components';

type IColor = {
  light: string;
  main: string;
  dark: string;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bg: IColor;
      default: IColor;
      primary: IColor;
      danger: IColor;
      success: IColor;
      text: string;
      invertText: string;
    };
    fontSizeBase: '1.4rem';
    fontWeights: number[];
    fontFamily: string;
    borderRadius: number;
  }
}

import Color from 'color';
import { IColor } from '../../styles/theme';

export const isLight = (color: string) => {
  return Color(color).luminosity() > 0.65;
};

export const lighten = (color: string, by: number) => {
  return Color(color).lighten(by).rgb().string();
};

export const getColor = (
  palette: { [key: string]: IColor | string },
  key: string,
  shade: 'light' | 'main' | 'dark'
) => {
  const color = palette[key];
  if (!color) return '';

  if (typeof color === 'object') {
    return color[shade];
  }

  return color;
};

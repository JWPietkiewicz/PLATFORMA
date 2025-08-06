import { createLightTheme, createDarkTheme } from '@fluentui/react-components';

const brand3LK = {
  10: '#020206',
  20: '#121626',
  30: '#182444',
  40: '#1B2F5E',
  50: '#1D3B78',
  60: '#28478C',
  70: '#3C5495',
  80: '#4F619E',
  90: '#606FA7',
  100: '#707DB0',
  110: '#818BB9',
  120: '#9199C2',
  130: '#A2A8CB',
  140: '#B2B7D5',
  150: '#C2C6DE',
  160: '#D3D6E7',
};

export const lightTheme = {
  ...createLightTheme(brand3LK),
};

export const darkTheme = {
  ...createDarkTheme(brand3LK),
};

darkTheme.colorBrandForeground1 = brand3LK[110];
darkTheme.colorBrandForeground2 = brand3LK[120];


import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFE81F', // Star Wars yellow
    accent: '#000000',
    background: '#000000',
    surface: '#121212',
    error: '#CF6679',
    text: '#FFFFFF',
    disabled: '#9E9E9E',
    placeholder: '#9E9E9E',
    backdrop: 'rgba(0, 0, 0, 0.8)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  roundness: 8,
  animation: {
    scale: 1.0,
  },
};

export default theme;

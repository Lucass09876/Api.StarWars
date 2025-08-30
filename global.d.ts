// Type definitions for Expo modules
declare module 'expo-status-bar';
declare module 'expo-splash-screen';
declare module 'expo-font';
declare module 'expo-constants';
declare module 'expo-linking';

// Type definitions for React Navigation
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Register: undefined;
      CharacterSelect: undefined;
      Home: undefined;
      Profile: undefined;
      CharacterSearch: undefined;
    }
  }
}

export {};

# Star Wars Character App

A React Native mobile application that allows users to register, search for Star Wars characters, and select their favorite character. Built with TypeScript, React Navigation, and the Star Wars API (SWAPI).

## Features

- User registration and authentication
- Search for Star Wars characters using the SWAPI
- Select and save your favorite character
- View detailed character information
- Modern and responsive UI with a Star Wars theme
- Persistent storage using AsyncStorage

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native development environment set up (Android Studio / Xcode)
- For testing on a physical device, you'll need a device with USB debugging enabled or an emulator

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/star-wars-app.git
   cd star-wars-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Install iOS dependencies (macOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

## Running the App

### Android
```bash
# Start the Metro bundler
npx react-native start

# In a new terminal, run the app on Android
npx react-native run-android
```

### iOS (macOS only)
```bash
# Start the Metro bundler
npx react-native start

# In a new terminal, run the app on iOS
npx react-native run-ios
```

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── contexts/      # React contexts for state management
  ├── screens/       # App screens
  ├── theme/         # Theme and styling
  └── types/         # TypeScript type definitions
```

## Dependencies

- React Native
- React Navigation
- React Native Paper (UI components)
- React Native Vector Icons
- @react-native-async-storage/async-storage
- TypeScript
- React Native Gesture Handler
- React Native Reanimated
- React Native Safe Area Context
- React Native Screens

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Star Wars API (SWAPI)](https://swapi.dev/)
- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://reactnativepaper.com/)

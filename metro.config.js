const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  
  // Add support for SVG and other assets
  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  };

  config.resolver = {
    ...config.resolver,
    assetExts: [...config.resolver.assetExts.filter(ext => ext !== 'svg'), 'db', 'mp3', 'ttf'],
    sourceExts: [...config.resolver.sourceExts, 'svg'],
  };

  return config;
})();

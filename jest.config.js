module.exports = {
  automock: false,
  preset: '@testing-library/react-native',
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-navigation|native-testing|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)"
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!__tests__/**/*.js',
    '!**/*.test.js',
    '!src/**/*.stories.js',
  ],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/services/tests/fileTransformer.js',
  },
}

module.exports = {
    preset: 'ts-jest', 
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy', 
    },
    setupFilesAfterEnv: [
      '@testing-library/jest-dom/extend-expect',
    ],
  };
  
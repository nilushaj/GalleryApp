/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import GalleryNavigation from './navigation/GalleryNavigation';
import { GalleryHomeProvider } from './contexts/GalleryHomeContext';

const App: () => React$Node = () => {
  return (
    <GalleryHomeProvider>
      <GalleryNavigation />
    </GalleryHomeProvider>

  );
};

export default App;

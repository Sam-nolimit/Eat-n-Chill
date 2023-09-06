import React from 'react';
import AppNavigation from './src/navigation/Navigation';
import {AuthProvider} from './src/context/AuthContext';
// import {AuthProvider} from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}

export default App;

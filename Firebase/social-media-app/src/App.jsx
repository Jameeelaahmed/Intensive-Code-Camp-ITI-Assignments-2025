import React from 'react';
import RoutesPages from './routes/RoutePages';
import AuthProvider from './contexts/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <RoutesPages />
    </AuthProvider>
  );
}

export default App;
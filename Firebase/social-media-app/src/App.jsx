import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesPages from './routes/RoutePages';

function App() {
  return (
    <BrowserRouter>
      <RoutesPages />
    </BrowserRouter>
  );
}

export default App;
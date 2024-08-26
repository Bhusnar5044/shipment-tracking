import * as React from 'react';
import ReactDOM from 'react-dom/client';

// fonts
import '@/styles/globals.css';

import App from './App';
import { ThemeProvider } from './components/theme-provider';
import StoreProvider from './store/StoreProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>
);

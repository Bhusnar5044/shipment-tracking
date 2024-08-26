import * as React from 'react';
import ReactDOM from 'react-dom/client';

// fonts
import '@/styles/globals.css';

import App from './App';
import StoreProvider from './store/StoreProvider';
import { ThemeProvider } from './components/theme-provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <StoreProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StoreProvider>
  </React.StrictMode>
);

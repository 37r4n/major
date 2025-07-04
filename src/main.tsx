import React from 'react';
import ReactDOM from 'react-dom/client';
import { HeroUIProvider } from '@heroui/react';
import { DrawerProvider } from './contexts/drawer-context';
import { ToastProvider } from './contexts/toast-context';
import { App } from './app';
import './styles/index.css';
import './i18n/index';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeroUIProvider>
      <DrawerProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </DrawerProvider>
    </HeroUIProvider>
  </React.StrictMode>,
);

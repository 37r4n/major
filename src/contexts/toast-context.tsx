import { addToast, ToastProps, ToastProvider as ToastProviderHUI } from '@heroui/react';
import { createContext, useContext } from 'react';

type ToastColor = ToastProps['color'];

type ToastContextType = {
  fire: (params: { title: string; description: string; color?: ToastColor }) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const fire = ({ title, description, color }: { title: string; description: string; color?: ToastColor }) => {
    addToast({ title, description, color });
  };

  return (
    <ToastContext.Provider value={{ fire }}>
      <ToastProviderHUI />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

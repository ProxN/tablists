import React, { createContext, useContext, useState } from 'react';

interface IToast {
  message: string;
  status?: string;
}

interface ToastState {
  toast?: IToast | null;
  setToast: (toast: IToast | null) => void;
}

const ToastContext = createContext<ToastState>({
  setToast: () => null,
});

export const ToastProvider: React.FC = (props) => {
  const [toast, setToast] = useState<IToast | null>(null);

  const setToastHandler = (values: IToast | null) => {
    setToast(values);
  };

  return (
    <ToastContext.Provider value={{ toast, setToast: setToastHandler }} {...props} />
  );
};

export const useToast = () => useContext(ToastContext);

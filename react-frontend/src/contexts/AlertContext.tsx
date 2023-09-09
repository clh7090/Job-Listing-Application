import { ReactNode, createContext, useContext, useState } from "react";

interface AlertInterface {
  message: string;
  setMessage: (newUsername: string) => void;
  isDisplayed: boolean;
  setIsDisplayed: (newBoolean: boolean) => void;
}

const AlertContext = createContext<AlertInterface | undefined>(undefined);

// custom hook to get around the undefined in createContext
export const useAlertContext = () => {
  const alertContext = useContext(AlertContext);
  if (!alertContext) {
    throw new Error("No context defined");
  }
  return alertContext;
};

interface Props {
  children: ReactNode;
}

export const AlertProvider = ({ children }: Props) => {
  const [message, setMessage] = useState<string>("");
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);

  return (
    <AlertContext.Provider
      value={{
        message,
        setMessage,
        isDisplayed,
        setIsDisplayed,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

import { ReactNode, createContext, useContext, useState } from "react";

interface UserInterface {
  username: string;
  setUsername: (newUsername: string) => void;
  signOut: () => void;
}

const UserContext = createContext<UserInterface | undefined>(undefined);

// custom hook to get around the undefined in createContext
export const useUserContext = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("No context defined");
  }
  return userContext;
};

interface Props {
  children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [username, setUsername] = useState("");

  const signOut = () => {
    setUsername("");
  };

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

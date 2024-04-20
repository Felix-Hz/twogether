"use client";

import {
  useState,
  Dispatch,
  useContext,
  createContext,
  SetStateAction,
} from "react";

interface SetterContextType {
  setUserEmail: Dispatch<SetStateAction<string>>;
  setUserExists: Dispatch<SetStateAction<boolean>>;
  setUserCreated: Dispatch<SetStateAction<boolean>>;
  setValidPassword: Dispatch<SetStateAction<boolean>>;
  setInitialLanding: Dispatch<SetStateAction<boolean>>;
  userEmail: string;
  userExists: boolean;
  userCreated: boolean;
  validPassword: boolean;
  initialLanding: boolean;
}

const SetterContext = createContext<SetterContextType | undefined>(undefined);

export const SetterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userEmail, setUserEmail] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [initialLanding, setInitialLanding] = useState(true);

  return (
    <SetterContext.Provider
      value={{
        setUserEmail,
        setUserExists,
        setUserCreated,
        setValidPassword,
        setInitialLanding,
        userEmail,
        userExists,
        userCreated,
        validPassword,
        initialLanding,
      }}
    >
      {children}
    </SetterContext.Provider>
  );
};

export const useSetters = () => {
  const context = useContext(SetterContext);
  if (!context) {
    throw new Error("useSetters must be used within a SetterProvider");
  }
  return context;
};

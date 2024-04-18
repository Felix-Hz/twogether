"use client";

import {
  useState,
  Dispatch,
  useEffect,
  useContext,
  createContext,
  SetStateAction,
} from "react";

interface SetterContextType {
  setUserExists: Dispatch<SetStateAction<boolean>>;
  setUserEmail: Dispatch<SetStateAction<string>>;
  userExists: boolean;
  userEmail: string;
}

const SetterContext = createContext<SetterContextType | undefined>(undefined);

export const SetterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userExists, setUserExists] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    console.log("userExists changed=", userExists);
  }, [userExists]);

  return (
    <SetterContext.Provider
      value={{ setUserExists, setUserEmail, userExists, userEmail }}
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

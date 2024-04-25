"use client";

import {
  useState,
  Dispatch,
  useContext,
  createContext,
  SetStateAction,
} from "react";

interface SetterContextType {
  setTheme: Dispatch<SetStateAction<string>>;
  setJwtToken: Dispatch<SetStateAction<string>>;
  theme: string;
  jwtToken: string;
}

const SetterContext = createContext<SetterContextType | undefined>(undefined);

export const GlobalSetterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState("dark");
  const [jwtToken, setJwtToken] = useState("");

  return (
    <SetterContext.Provider
      value={{
        setTheme,
        setJwtToken,
        theme,
        jwtToken,
      }}
    >
      {children}
    </SetterContext.Provider>
  );
};

export const useGlobalSetters = () => {
  const context = useContext(SetterContext);
  if (!context) {
    throw new Error(
      "useGlobalSetters must be used within a GlobalSetterProvider"
    );
  }
  return context;
};

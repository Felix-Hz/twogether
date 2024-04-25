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
  setShowInvalid: Dispatch<SetStateAction<boolean>>;
  setUserCreated: Dispatch<SetStateAction<boolean>>;
  setInitialLanding: Dispatch<SetStateAction<boolean>>;
  setPasswordVisible: Dispatch<SetStateAction<boolean>>;
  userEmail: string;
  userExists: boolean;
  userCreated: boolean;
  showInvalid: boolean;
  initialLanding: boolean;
  passwordVisible: boolean;
}

const SetterContext = createContext<SetterContextType | undefined>(undefined);

export const LoginSetterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userEmail, setUserEmail] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [initialLanding, setInitialLanding] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SetterContext.Provider
      value={{
        setUserEmail,
        setUserExists,
        setUserCreated,
        setShowInvalid,
        setInitialLanding,
        setPasswordVisible,
        userEmail,
        userExists,
        showInvalid,
        userCreated,
        initialLanding,
        passwordVisible,
      }}
    >
      {children}
    </SetterContext.Provider>
  );
};

export const useLoginSetters = () => {
  const context = useContext(SetterContext);
  if (!context) {
    throw new Error(
      "useLoginSetters must be used within a LoginSetterProvider"
    );
  }
  return context;
};

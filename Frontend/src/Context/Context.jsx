import { createContext, useState } from "react";

const AllContext = createContext();

const ContextProvider = ({ children }) => {
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [active, setActive] = useState("dashboard");

  return (
    <AllContext.Provider
      value={{ role, setRole, token, setToken, active, setActive }}
    >
      {children}
    </AllContext.Provider>
  );
};

export { AllContext, ContextProvider };

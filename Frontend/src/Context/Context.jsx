import { createContext, useState } from "react";

const AllContext = createContext();

const ContextProvider = ({ children }) => {
  const [role, setRole] = useState();
  const [token, setToken] = useState();

  return (
    <AllContext.Provider value={{ role, setRole, token, setToken }}>
      {children}
    </AllContext.Provider>
  );
};

export { AllContext, ContextProvider };

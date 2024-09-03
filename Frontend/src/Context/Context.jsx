import { createContext, useState } from "react";

const AllContext = createContext();

const ContextProvider = ({ children }) => {
  const [allData, setAllData] = useState();

  return (
    <AllContext.Provider value={{ allData, setAllData }}>
      {children}
    </AllContext.Provider>
  );
};

export { AllContext, ContextProvider };

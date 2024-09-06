import { createContext, useState } from "react";

const AllContext = createContext();

const ContextProvider = ({ children }) => {
  const [allData, setAllData] = useState();
  const [registerMember, setregisterMember] = useState({
    cardNo: "",
    memberName: "",
    enrolledDate: "",
    expiryDate: "",
    email: "",
    contact: "",
    plan: "",
    price: "",
  });

  return (
    <AllContext.Provider
      value={{ allData, setAllData, registerMember, setregisterMember }}
    >
      {children}
    </AllContext.Provider>
  );
};

export { AllContext, ContextProvider };

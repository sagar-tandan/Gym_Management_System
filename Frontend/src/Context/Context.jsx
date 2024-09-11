import { createContext, useState } from "react";

const AllContext = createContext();

const ContextProvider = ({ children }) => {
  const [allData, setAllData] = useState();
  // const [registerMember, setregisterMember] = useState({
  //   cardNo: "",
  //   memberName: "",
  //   enrolledDate: "",
  //   expiryDate: "",
  //   email: "",
  //   contact: "",
  //   plan: "",
  //   price: "",
  // });
  const [token, setToken] = useState();

  return (
    <AllContext.Provider value={{ allData, setAllData, token, setToken }}>
      {children}
    </AllContext.Provider>
  );
};

export { AllContext, ContextProvider };

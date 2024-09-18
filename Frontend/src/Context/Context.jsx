import { createContext, useState } from "react";

const AllContext = createContext();

const ContextProvider = ({ children }) => {
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [active, setActive] = useState("Dashboard");
  const [dashboardDetail, setDashboardDetail] = useState();
  const [query, setQuery] = useState("");

  return (
    <AllContext.Provider
      value={{
        role,
        setRole,
        token,
        setToken,
        active,
        setActive,
        dashboardDetail,
        setDashboardDetail,
        query,
        setQuery,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

export { AllContext, ContextProvider };

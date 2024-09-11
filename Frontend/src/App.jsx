import { useContext, useEffect, useState } from "react";
import AdminPage from "./Admin/AdminPage";
import AdminiLoginPage from "./AdminiLoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AllContext } from "./Context/Context";

function App() {
  const { token, setToken } = useContext(AllContext);

  function GetDataFromLocalStorage() {
    const tkn = localStorage.getItem("token");
    const expiryTime = localStorage.getItem("expiryTime");

    if (expiryTime && new Date().getTime() > expiryTime) {
      localStorage.clear();
      setToken(null);
    } else if (tkn) {
      setToken(tkn);
    }
  }

  useEffect(() => {
    GetDataFromLocalStorage();
  }, []);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/adminlogin"
            element={
              token ? <Navigate to="/adminDashboard" /> : <AdminiLoginPage />
            }
          />
          <Route
            path="/adminDashboard"
            element={token ? <AdminPage /> : <Navigate to="/adminlogin" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

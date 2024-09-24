import { useContext, useEffect, useState } from "react";
import AdminPage from "./Admin/AdminPage";
import AdminiLoginPage from "./AdminiLoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AllContext } from "./Context/Context";
import AdminDashboard from "./Admin/AdminComp/AdminDashboard";
import SearchComp from "./Admin/AdminComp/SearchComp";
import UserPage from "./User/UserPage";
import Navbar from "./User/UserComponents/NavBar";

function App() {
  const { token, setToken } = useContext(AllContext);
  const { role, setRole } = useContext(AllContext);

  function GetDataFromLocalStorage() {
    const tkn = localStorage.getItem("token");
    const expiryTime = localStorage.getItem("expiryTime");
    const role = localStorage.getItem("role");

    if (expiryTime && new Date().getTime() > expiryTime) {
      localStorage.clear();
      setToken(null);
    } else if (tkn) {
      setToken(tkn);
      setRole(role);
    }
  }

  useEffect(() => {
    GetDataFromLocalStorage();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route
            path="/adminlogin"
            element={
              token && role != "User" ? (
                <Navigate to="/adminDashboard" />
              ) : (
                <AdminiLoginPage />
              )
            }
          />
          <Route
            path="/adminDashboard"
            element={
              token && role != "User" ? (
                <AdminPage />
              ) : (
                <Navigate to="/adminlogin" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

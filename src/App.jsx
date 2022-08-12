import "./App.css";
import Login from "./components/pages/Login/Login";
import { useState, useEffect } from "react";
import Home from "./components/pages/Home/Home";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

// const [token, setToken] = useState("");

// useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (token) setToken(token);
// }, []);
// return (
//   <div className="container">
//     {token.length === 0 && <Login />}
//     {token.length > 0 && <Home />}
//   </div>
// );

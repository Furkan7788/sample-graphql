import logo from "./logo.svg";
import Header from "./components/header/header";
import { BrowserRouter,Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import Dashboard from "./components/dashboard/dashboard";
import Landingpage from "./components/landing-page/landing-page";

function App() {
  

  return (
    <>
    <Header></Header>
    <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Landingpage />}>
       
      </Route>
    </Routes>
  </BrowserRouter>
    </>
  );
}

export default App;

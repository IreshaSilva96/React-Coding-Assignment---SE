import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import FormEmail from "./Components/Form/FormEmail";
import Color from "./Components/Color/Color";
import FinalForm from "./Components/FinalForm/FinalForm";
import React from "react";
// import logo from "/logo.svg";
import { Container, Navbar } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <div className="header">
        <p>Sample Page</p>
      </div>
      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formemail" element={<FormEmail />} />
          <Route path="/color" element={<Color />} />
          <Route path="/finalForm" element={<FinalForm />} />
        </Routes>
      </div>
      <div className="footer">
        <p>Created by Rashi Silva.</p>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import { HashRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import Router from "./router/Router";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={3000} />
        <Router />
      </HashRouter>
    </div>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Router from "./router/Router";
import "antd/dist/reset.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={3000} />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
// import 'antd/dist/antd.css';
import Router from "./router/Router";
import TimeAgo from "javascript-time-ago";
import vi from "javascript-time-ago/locale/vi.json";
TimeAgo.addDefaultLocale(vi);
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

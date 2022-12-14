import { BrowserRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import 'antd/dist/reset.css';
import Router from "./router/Router";
// chỗ này hay gặp lỗi

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* less time for notification */}
        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={2000} />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;

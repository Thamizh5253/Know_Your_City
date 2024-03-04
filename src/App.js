import "./App.css";
import PIN from "./pin.jsx";
import Like from "./like";
import Ques from "./ques";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
Modal.setAppElement("#root");

function App() {
  return (
    <div className="App">
      <Ques>HIwelll</Ques>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <PIN></PIN>
      <Like></Like>
    </div>
  );
}

export default App;

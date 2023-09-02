import "./App.css";
import Drinks from "./components/Drinks";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import Home from "./pages/Home";
import SpecificProduct from "./pages/SpecificProduct";
import Splash from "./pages/Splash";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Progress from "./pages/Progress";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SpecificDrink from "./pages/SpecificDrink";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<SpecificProduct />} />
          <Route path="/drink/:id" element={<SpecificDrink />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;

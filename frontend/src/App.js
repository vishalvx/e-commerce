import "./App.css";
import Header from "./components/Layouts/Header";
import Navbar from "./components/Layouts/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import Profile from "./components/Profile/Profile";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;

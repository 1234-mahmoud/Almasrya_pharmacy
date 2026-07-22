import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import Home from "../pages/Home";
import HomeRedirect from "../pages/HomeRedirect";
import Inventory from "../pages/Inventory";
import Purchase from "../pages/Purchase";
import Selling from "../pages/Selling";
import Customers from "../pages/Customers";
import Admin from "../pages/Admin";
import Cashier from "../pages/Cashier";
import User from "../pages/User";
import Footer from "../components/Footer";
import Login from "../pages/Login";
import Register from "../pages/Register";
import GoogleSuccess from "../pages/GoogleSuccess";
import ForgetPassword from "../pages/ForgetPassword";
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* <Tabs /> */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                localStorage.getItem("user") ? <HomeRedirect /> : <Home />
              }
            />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/selling" element={<Selling />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cashier" element={<Cashier />} />
            <Route path="/user" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget" element={<ForgetPassword />} />
            <Route path="/google-success" element={<GoogleSuccess />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

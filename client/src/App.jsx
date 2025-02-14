import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { 
  Home, About, Contact, Login, Dashboard, Crop, BagSection, Register, 
  ForgotPassword, VerifyOtp, UpdatePassword, Profile, Payment, 
  PaymentForm, Paymentsuccess, OrderPlaced, Order, Bag 
} from "./components/pages"; 
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51QJs93K8ylA97zS7EdjiN3Y6A7A0lVm2Q35tjf7NBYh7ODeXHSfZA7ezpgjaKHcXIkeETkCZGKkN7MUVf7qWFSYX00ymTle845");

function App() {
  const navigate = useNavigate();

  // ✅ Fix: Ensure user is loaded from localStorage only once
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });

  // ✅ Fix: Update user state when localStorage changes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
      }
    }
  }, []);

  // ✅ Fix: Ensure navbar updates immediately on login/logout
  const handleUserUpdate = (newUser) => {
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    setUser(newUser);
  };

  return (
    <div className="App">
      <Navbar setUser={handleUserUpdate} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login setUser={handleUserUpdate} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/otp" element={<VerifyOtp />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crop" element={<Crop />} />
        <Route path="/bagsection" element={<BagSection />} />
        <Route path="/Paymentsuccess" element={<Paymentsuccess />} />
        <Route path="/OrderPlaced" element={<OrderPlaced />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/bag" element={<Bag />} />

        {/* ✅ Fix: Redirect to profile only if user is logged in */}
        <Route 
          path="/profile" 
          element={user ? <Profile user={user} setUser={handleUserUpdate} /> : <Navigate to="/login" />}
        />

        <Route 
          path="/payment" 
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          } 
        />

        <Route path="/paymentForm" element={<PaymentForm />} />
      </Routes>
    </div>
  );
}

export default App;

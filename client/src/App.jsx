import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { About, Contact, Home, Login, Dashboard, Crop, BagSection, Register, ForgotPassword, VerifyOtp, UpdatePassword, Profile, Payment, PaymentForm, Paymentsuccess, OrderPlaced, Order,Bag} from "./components/pages"; 
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

function App() {
  const [user, setUser] = useState(null);  // Store user info in state
  const stripePromise = loadStripe('pk_test_51QJs93K8ylA97zS7EdjiN3Y6A7A0lVm2Q35tjf7NBYh7ODeXHSfZA7ezpgjaKHcXIkeETkCZGKkN7MUVf7qWFSYX00ymTle845');

  return (
    <div className="App">
      <Navbar  setUser={setUser} /> {/* Pass user info and setUser to Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setUser={setUser} />} /> {/* Pass setUser to Login */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crop" element={<Crop />} />
        <Route path="/bagsection" element={<BagSection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/otp" element={<VerifyOtp />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Paymentsuccess" element={<Paymentsuccess />} />
        <Route path="/OrderPlaced" element={<OrderPlaced />} />
        <Route path="/Order" element={<Order />} />

        {/* Stripe Elements wrapped around Payment Route */}
        <Route path="/payment" element={
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        } />
        
        <Route path="/paymentForm" element={<PaymentForm />} />
        <Route path ="/bag" element ={<Bag/>} />
      </Routes>
    </div>
  );
}

export default App;

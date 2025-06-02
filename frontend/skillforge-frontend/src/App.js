import React from "react";
import "./index.css";
import { Routes, Route, useParams } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./components/Portfolio";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import About from "./components/About";
import Contact from "./components/contactSection";
import Layout from "./components/Layout"; // ✅ Main layout wrapper

function PortfolioWrapper() {
  const { userId } = useParams();
  return <Portfolio userId={Number(userId)} />;
}

function App() {
  return (
    <Routes>
      {/* Wrapped in Layout: Navbar & Footer visible */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/signup" element={<Layout><Signup /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />

      {/* Portfolio page: No main layout, uses its own Navbar/Footer */}
      <Route path="/portfolio/:userId" element={<PortfolioWrapper />} />

      {/* Dashboard with auth protection and Layout */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout><Dashboard /></Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;

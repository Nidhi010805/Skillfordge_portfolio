import React from "react";
import Navbar from "./Navbar";    // apna main website ka navbar
import Footer from "./Footer";    // apna main website ka footer

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {children}   {/* yeh jahan bhi layout use hoga wahan page ka content aayega */}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;

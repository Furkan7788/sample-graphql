import React from "react";
import "./header.css";


const Header = () => {
  return (
    <div class="header">
    <a href="#default" class="logo">CompanyLogo</a>
    <div class="header-right">
      <a class="active" href="/home">Home</a>
      <a href="/dashboard">dashboard</a>
    </div>
  </div>
    
  );
};

export default Header;

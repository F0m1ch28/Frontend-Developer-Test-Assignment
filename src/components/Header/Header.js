import React from 'react';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import './Header.css';

function Header() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section && section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="header">
      <Logo className="logo" />
      <nav className="navigation">
        <button className="nav-link" onClick={() => scrollToSection('users')}>Users</button>
        <button className="nav-link" onClick={() => scrollToSection('register')}>Sign Up</button>
      </nav>
    </header>
  );
}

export default Header;

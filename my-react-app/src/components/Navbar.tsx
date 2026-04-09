import { useState, useEffect } from "react"
import Logo from "./Logo"
import NovedadesButton from "./NovedadesButton"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav className="navbar">
      <div className="navbarLogo">
        <Logo scale={0.28}/>
        <p className="logoText">Undefined club</p>
      </div>

      <div className={`buttons ${isOpen ? 'open' : ''}`}>
        <button onClick={() => setIsOpen(false)}>Inicio</button>
        <button onClick={() => setIsOpen(false)}>Novedades</button>
        <button onClick={() => setIsOpen(false)}>Información</button>
        <button className="LoginButton" onClick={() => setIsOpen(false)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Login</button>
      </div>

      <button 
        className={`hamburger ${isOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isOpen && <div className="menu-overlay" onClick={() => setIsOpen(false)}></div>}
    </nav>
  )
}

export default Navbar
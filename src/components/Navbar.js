import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';

function Navbar() {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    setClick(false);

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    };

  const showButton = () => {
    if(window.innerWidth <= 960) {
        setButton(false);
    } else{
        setButton(true);
    }
  };


  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                S.S
            </Link>
            <div 
            className='menu-icon'
            onClick={handleClick}
            >
            {click ? '✕' : '☰'}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}> 
                <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                    Home
                </Link>
                </li>

                <li className='nav-item'>
                <Link to='/gallery' className='nav-links' onClick={closeMobileMenu}>
                    Gallery
                </Link>
                </li>

                <li className='nav-item'>
                <Link to='/projects' className='nav-links' onClick={closeMobileMenu}>
                    Projects
                </Link>
                </li>

                <li className="nav-item">
                <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                    About Me
                </Link>
                </li>
            </ul>
            {button && (
            <Button
                path='/about'
                buttonStyle='btn--outline'
                buttonSize='btn--medium'
            >
                ABOUT ME
            </Button>
            )}
        </div>
      </nav>
    </>
  )
}

export default Navbar

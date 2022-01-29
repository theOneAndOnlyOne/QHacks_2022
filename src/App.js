
import React, { useState }  from 'react';
import Spotify from 'react-spotify-embed';
import { ReactComponent as Hamburger } from './icons/hamburgerMenu.svg';
import { ReactComponent as About} from './icons/i.svg';
import Form from './Form';
//import { ReactComponent as Diamond } from './icons/diamond.svg';

import {CSSTransition} from 'react-transition-group';


const spotifySongLink = "https://open.spotify.com/track/1EWLulTbAPFXrpj9gLcWFT?si=53ab72bf46c64bc0";

function App() {
  return (
      <>
      <Navbar>
        <NavItem icon = {<Hamburger/>}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
      <SpotifyPlugin></SpotifyPlugin>
      <Form/>
      </>
      
  );
}

function SpotifyPlugin() {
  return (
    <div className = "background">
      <div className = "embed">
        <Spotify link= {spotifySongLink}/>
      </div>
        <div>
          <button className = "surpriseButton">Surprise Me</button>
        </div>
      
    </div>
    
  );
}


function Navbar(props) {
  return (
    <nav className = "navbar">
        <ul className='navbar-nav'>{ props.children }</ul>
        
    </nav>

  );
}

function NavItem(props) {

  const [open, setOpen] = useState(false);

  return (
    <li className='nav-item'>
      <a href="#" className='icon-button' onClick={()=>setOpen(!open)}>
        { props.icon }
      </a>

      {open && props.children}

    </li>
    
  );
}

function DropdownMenu() { 

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href ="#" className='menu-item' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className='icon-button'>{props.leftIcon}</span>
        {props.children}

        <span className = "icon-right">{props.rightIcon}</span>

      </a>
    )
  }

  return (
    <div className = "dropdown" style = {{ height: menuHeight}}>
      <CSSTransition 
        in = {activeMenu === 'main'} 
        unmountOnExit 
        timeout={500}
        classNames = "menu-primary"
        onEnter={calcHeight}
        >
          <div className = "menu">

            <DropdownItem> My Profile </DropdownItem>
            
            <DropdownItem
              className='icon-button' 
              leftIcon = {<About/>}
              goToMenu = "about"
              >  
            About Us</DropdownItem>
          </div>
      </CSSTransition>

      <CSSTransition 
        in = {activeMenu === 'about'} 
        unmountOnExit 
        timeout={500}
        classNames = "menu-secondary"
        onEnter={calcHeight}
        >
          <div className = "menu">
            <DropdownItem
              className='icon-button' 
              goToMenu = "main"
              >Back</DropdownItem>
            <p>What's good QHacks! This is Team 49. This is app is created by June Oh, Joshua Gonzales, Josh Allen and Leah Marshall.</p>
          </div>
          
      </CSSTransition>
    </div>
  );
}

export default App;

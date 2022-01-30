
import React, { useState }  from 'react';
import Spotify from 'react-spotify-embed';
import { ReactComponent as Hamburger } from './icons/hamburgerMenu.svg';
import { ReactComponent as About} from './icons/i.svg';
import Form from './Form';
import axios from 'axios';
import { userTable } from 'react-table';
//import { ReactComponent as Diamond } from './icons/diamond.svg';
//import Server from './server/server'

import {CSSTransition} from 'react-transition-group';


const spotifySongLink = "https://open.spotify.com/track/6WC3MB4KyAJ1KhGuqzq0W2?si=b1861bfdccc740da";
//let singerId = "1Xyo4u8uXC1ZmMpatF05PJ";
let singerInfo = [
  {
    "name": "A$AP Rocky",
    "id": "13ubrt8QOOCPljQ2FL1Kca",
    "spotify": "https://open.spotify.com/artist/13ubrt8QOOCPljQ2FL1Kca"

  },
  {
    "name": "Childish Gambino",
    "id": "73sIBHcqh3Z3NyqHKZ7FOL",
    "spotify": "https://open.spotify.com/artist/73sIBHcqh3Z3NyqHKZ7FOL"
  }
];

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
  

  const sayHello = async () => {
    try {
      const res = await axios.get('http://localhost:3001/related?id=1Xyo4u8uXC1ZmMpatF05PJ');
      const artistsId = res.data.artists;
      let data = artistsId;
      console.log(singerInfo);
      singerInfo =[]
      for (let i = 0; i < data.length; i++)
      {
        singerInfo.push({'name':data[i].name, 'id':data[i].id, 'spotify':data[i].external_urls.spotify});
      }
      console.log(singerInfo);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className = "background">
      <div className = "embed">
        <Spotify link= {spotifySongLink}/>
        
      </div>
      <form onSubmit ={sayHello}>
          <label name="input-text" id="input-text" required spellcheck="false"> Enter Spotify ID
            <input type = "text"/>
          </label>
      </form>
      <div>
        <button className = "surpriseButton" onClick={sayHello}>Enter Spotify ID</button>
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

  function LoginButton(props) {
    return (
      <a href ="#" className='menu-item'>
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
            <LoginButton> My Profile </LoginButton>
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

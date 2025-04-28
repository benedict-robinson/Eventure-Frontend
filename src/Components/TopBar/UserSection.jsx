import { Link } from "react-router-dom";
import useScreenWidth from "../../Custom Hooks/useScreenWidth.jsx";
import "./TopBar.css"
import UserIconComp from "./UserIcon.jsx";
import { useState } from "react";

export default function UserSection() {
  const screenWidth = useScreenWidth()
  const [showDropdown, setShowDropdown] = useState(false);
  let timeoutId;

  function handleMouseEnter() {
    clearTimeout(timeoutId);
    setShowDropdown(true);
  }

  function handleMouseLeave() {
    timeoutId = setTimeout(() => {
      setShowDropdown(false);
    }, 100); 
  }

    return (
      <div className="user-section" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Link to={"/account"}>
        <div className="user-icon">
          <UserIconComp id="user-icon"/>
        </div>
        </Link>
        <div className="user-email">
          {screenWidth > 612 ? <span className="email-text">user@example.com</span> : <></>}
        </div>
        <div className={`profile-dropdown ${showDropdown ? 'show' : ''}`}>
        <Link to={"/account"}><p>Account</p></Link>
          <p>Favourites</p>
          <p>Going</p>
          <p>My Events</p>
          <p>Create New Event</p>
          <p>Log Out</p>
        </div>
      </div>
    );
  }
  

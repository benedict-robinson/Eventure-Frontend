import { Link } from "react-router-dom";
import useScreenWidth from "../../Custom Hooks/useScreenWidth.jsx";
import "./TopBar.css"
import UserIconComp from "./UserIcon.jsx";
import { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext.jsx";

export default function UserSection() {
  const screenWidth = useScreenWidth()
  const [showDropdown, setShowDropdown] = useState(false);
  let timeoutId;
  const { user } = useContext(UserContext)

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
          <UserIconComp id="user-icon" />
        </div>
      </Link>
      <div className="user-email">
        {screenWidth > 612 ? <span className="email-text">user@example.com</span> : <></>}
      </div>
      <div className={`profile-dropdown ${showDropdown ? 'show' : ''}`}>
        <Link to={"/account"}><p>Account</p></Link>
        <Link to={"/account/favourites"}>
          <p>Favourites</p>
        </Link>
        <Link to={"/account/going"}>
          <p>Going</p>
        </Link>
        {user.is_staff ? <Link to={"/account/myevents"}>
          <p>My Events</p>
        </Link> : <></>}
        {user.is_staff ? <Link to={"/account/create"}>
          <p>Create New Event</p>
        </Link> : <></>}
        <Link to={"/account/logout"}>
          <p>Log Out</p>
        </Link>
      </div>
    </div>
  );
}


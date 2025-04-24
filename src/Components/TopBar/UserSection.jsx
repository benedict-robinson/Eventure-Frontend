import useScreenWidth from "../../Custom Hooks/useScreenWidth.jsx";
import "./TopBar.css"
import UserIconComp from "./UserIcon.jsx";

export default function UserSection() {
  const screenWidth = useScreenWidth()

    return (
      <div className="user-section">
        <div className="user-icon">
          <UserIconComp id="user-icon"/>
        </div>
        <div className="user-email">
          {screenWidth > 612 ? <span className="email-text">user@example.com</span> : <></>}
        </div>
      </div>
    );
  }
  

import "./TopBar.css"
import UserIconComp from "./UserIcon.jsx";

export default function UserSection() {
    return (
      <div className="user-section">
        <div className="user-icon">
          <UserIconComp id="user-icon"/>
        </div>
        <div className="user-email">
          <span className="email-text">user@example.com</span>
        </div>
      </div>
    );
  }
  

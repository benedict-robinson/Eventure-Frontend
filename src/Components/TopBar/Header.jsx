import logoSrc from "../../assets/eventure-logo.svg"
import "./TopBar.css"

export default function Header() {
  return (
    <div className="header">
        <img src={logoSrc} alt="Logo" width="200" height="100" />
    </div>
  )
}



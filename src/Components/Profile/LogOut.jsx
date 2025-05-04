import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../Contexts/UserContext.jsx"
import "./CSS/Profile.css"


export default function LogOut() {
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  function handleNo() {
    navigate("/account")
  }
  function handleYes () {
    setUser({})
    navigate("/")
  }
  return (
    <div className="log-out-container">
    <h3>Are you sure you want to log out?</h3>
    <div className="buttons-container">
      <button id="yes-button" onClick={handleYes}>Yes</button>
      <button id="no-button" onClick={handleNo}>No</button>
    </div>
    </div>
  )
}

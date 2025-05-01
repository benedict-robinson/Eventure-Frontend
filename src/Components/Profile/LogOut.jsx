import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../Contexts/UserContext.jsx"


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
    <div>
    <h3>Are you sure you want to log out?</h3>
    <div>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleNo}>No</button>
    </div>
    </div>
  )
}

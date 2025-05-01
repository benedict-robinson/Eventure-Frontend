import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../Contexts/UserContext.jsx"


export default function SignIn() {
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
    function handleCreate() {
        navigate("/new-user")
    }
    function handlePreviousUser() {
        localStorage.setItem("username", "user1")
        setUser({username: "user1"})
        navigate("/")
    }
  return (
    <div>
        <div>
            <h2>Previous Users</h2>
            <button onClick={handlePreviousUser}>
            <div>
                <img src="https://avatar.iran.liara.run/public/boy?username=Ash" />
                <p>user1</p>
            </div>
            </button>
            <div>
                <button onClick={handleCreate}>Create New Account</button>
            </div>
        </div>
    </div>
  )
}

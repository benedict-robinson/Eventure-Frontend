import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../Contexts/UserContext.jsx"
import { fetchUserByUsername } from "../../api.js"


export default function SignIn() {
    const navigate = useNavigate()
    const [existingUser, setExistingUser] = useState({})
    const { setUser } = useContext(UserContext)
    const [errMsg, setErrMsg] = useState("")
    function handleCreate() {
        navigate("/new-user")
    }
    function handlePreviousUser() {
        localStorage.setItem("username", "user1")
        setUser({ username: "user1" })
        navigate("/")
    }
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setExistingUser({ ...existingUser, [key]: value })
    }
    function handleSignIn(e) {
        e.preventDefault()
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(existingUser.email)) {
            setErrMsg("Invalid Email")
            return
        }
        fetchUserByUsername(existingUser.username).then((user) => {
            setErrMsg("")
            if (user.email === existingUser.email) {
                localStorage.setItem("username", user.username)
                setUser({ username: user.username })
                navigate("/")
            } else {
                setErrMsg("Email does not match Username")
            }
        })
            .catch((err) => {
                if (err.status === 404) {
                    setErrMsg("No User Found")
                }
            })
    }
    return (
        <div>
            <div>
                <h2>Sign In</h2>
                <div>
                    <label>Username</label>
                    <input type="text" placeholder="Joe Bloggs" id="username" onChange={handleChange} />
                    <label>Email</label>
                    <input type="text" placeholder="joebloggs@example.com" id="email" onChange={handleChange} />
                    <button onClick={handleSignIn} disabled={!(existingUser.username && existingUser.email)}>Sign In</button>
                    {errMsg ? <p>{errMsg}</p> : <></>}
                </div>
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

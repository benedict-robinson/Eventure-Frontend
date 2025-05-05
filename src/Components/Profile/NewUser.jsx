import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../Contexts/UserContext.jsx"
import { postNewUser } from "../../api.js"
import "./CSS/NewUser.css"


export default function NewUser() {
    const [newUser, setNewUser] = useState({is_staff: false})
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
    const [isErr, setIsErr] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    function handleChange(e) {
        const key = e.target.id;
    
        if (e.target.type === "file") {
            const file = e.target.files[0];
            const reader = new FileReader();
    
            reader.onloadend = () => {
                const base64String = reader.result;
                setNewUser(prev => ({ ...prev, [key]: base64String }));
            };
    
            if (file) {
                reader.readAsDataURL(file); 
            }
        } else if (e.target.type === "checkbox") {
            setNewUser(prev => ({ ...prev, [key]: e.target.checked }));
        } else {
            const value = e.target.value;
            setNewUser(prev => ({ ...prev, [key]: value }));
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(newUser.email)) {
            setErrMsg("Invalid Email")
            return
        }
        postNewUser(newUser).then(() => {
            setUser(newUser)
            navigate("/")
        })
        .catch((err) => {
            console.log({err})
            setIsErr(true)
        })
    }

    if (isErr) {
        return (
            <div className="error-page">
                <h2>Could Not Create User</h2>
                <p>Please Refresh and Try Again</p>
            </div>
        )
    }

    return (
        <div className="create-new-user-page-container">
            <div className="create-new-user-page-container">
            <h2>Create New User</h2>
            <form>
                <label id="username-label" htmlFor="username">Username</label>
                <input type="text" id="username" onChange={handleChange}/>
                <label id="email-label" htmlFor="email">Email</label>
                <input type="text" id="email" onChange={handleChange}/>
                <div className="image-and-tag">
                <label id="image-label" htmlFor='image_url'>Profile Picture (URL)</label>
                <input type="text" id="image_url" onChange={handleChange}/>
                <p id="img-tagline">Unfortunately we can only accept images by URL at the moment</p>
                </div>
                <div className="staff-checkbox">
                <label id="staff-label" htmlFor="is_staff">Are you an Event Organiser?</label>
                <input type="checkbox" id="is_staff" onChange={handleChange}/>
                </div>
            </form>
            <div className="sign-in-button-container">
            <button onClick={handleSubmit} disabled={!newUser.username || !newUser.email|| !Object.keys(newUser).includes("is_staff")}>Sign In</button>
            {errMsg ? <p id="error-msg">{errMsg}</p> : <></>}
            </div>
            </div>
        </div>
    )
}

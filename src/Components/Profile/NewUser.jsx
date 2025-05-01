import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../Contexts/UserContext.jsx"
import { postNewUser } from "../../api.js"


export default function NewUser() {
    const [newUser, setNewUser] = useState({is_staff: null})
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
    const [isErr, setIsErr] = useState(false)

    function handleChange(e) {
        console.log(newUser)
        console.log(Object.keys(newUser))
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
        console.log(newUser)
        postNewUser(newUser).then((response) => {
            console.log(response)
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
            <div>
                <h2>Could Not Create User</h2>
                <p>Please Refresh and Try Again</p>
            </div>
        )
    }

    return (
        <div>
            <h2>Create New User</h2>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" onChange={handleChange}/>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" onChange={handleChange}/>
                <label htmlFor='image_url'>Profile Picture</label>
                <input type="file" id="image_url" accept="image/*" onChange={handleChange}/>
                <label htmlFor="is_staff">Are you staff?</label>
                <input type="checkbox" id="is_staff" onChange={handleChange}/>
            </form>
            <button onClick={handleSubmit} disabled={!newUser.username || !newUser.email|| !Object.keys(newUser).includes("is_staff")}>Sign In</button>
        </div>
    )
}

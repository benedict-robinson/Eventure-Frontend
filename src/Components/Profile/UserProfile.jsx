import { useContext, useState } from "react"
import { UserContext } from "../../Contexts/UserContext.jsx"
import { useNavigate } from "react-router-dom"
import { deleteUser, patchUser } from "../../api.js"
import "./CSS/Profile.css"
import "./CSS/UserPage.css"


export default function UserProfile() {
  const { user, setUser } = useContext(UserContext)
  const [editedUser, setEditedUser] = useState({})
  const [deleteQ, setDeleteQ] = useState(false)
  const [isEditing, setIsEditing] =useState(false)
  const [emailMsg, setEmailMsg] = useState("")
  const navigate = useNavigate()

  function handleEdit() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (editedUser.email && !emailRegex.test(editedUser.email)) {
      setEmailMsg("Invalid Email")
      return
    }
    setIsEditing(!isEditing)
    if (isEditing) {
      patchUser(user.username, editedUser).then(({user}) => {
        setUser(user)
        setEmailMsg("")
      })
      .catch((err) => {
        console.error(err)
      })
    }
  }

  function handleDelete() {
    if (isEditing) {
      setIsEditing(false)
      setEmailMsg("")
    } else {
      setDeleteQ(true)
    }
  }

  function editUser(e) {
    const key = e.target.id
    const value = e.target.value
    setEditedUser((prev) => ({...prev, [key]: value}))
  }

  function handleNo() {
    setDeleteQ(false)
  }

  function handleYes() {
    if (user.username === "user1") {
      setUser({})
      navigate("/")
    } else {
      deleteUser(user.username).then(() => {
        setUser({})
        navigate("/")
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  if (deleteQ) {
    return (
      <div className="delete-q-container">
        <h3>Are you sure you want to delete your account?</h3>
        <div className="buttons-div">
          <button onClick={handleYes}>Yes</button>
          <button onClick={handleNo}>No</button>
        </div>
      </div>
    )
  }

  return (
    <div className="user-page-div">
      <div className="user-info-div">
      {!isEditing ? <h1>{user.username}</h1> : <input type="text" id="username" placeholder={user.username} onChange={editUser}/>}
      {!isEditing ? <img src={user.image_url} /> : <input type="text" id="image_url" placeholder={user.image_url ? user.image_url : "Image url..."} onChange={editUser}/>}
      {!isEditing ? <p>{user.email}</p> : <input type="text" id="email" placeholder={user.email} onChange={editUser}/>}
      {emailMsg ? <p>{emailMsg}</p> : <></>}
      </div>
      <div className="edit-delete-buttons">
        <button id="edit-button" onClick={handleEdit}>{isEditing ? "Save Edits" : "Edit Profile"}</button>
        <button id="delete-button" onClick={handleDelete}>{isEditing ? "Discard Edits" : "Delete Profile"}</button>
      </div>
    </div>
  )
}

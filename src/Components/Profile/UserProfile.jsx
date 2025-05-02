import { useContext, useState } from "react"
import { UserContext } from "../../Contexts/UserContext.jsx"
import { useNavigate } from "react-router-dom"
import { deleteUser } from "../../api.js"


export default function UserProfile() {
  const { user, setUser } = useContext(UserContext)
  const [deleteQ, setDeleteQ] = useState(false)
  const navigate = useNavigate()

  function handleEdit() {
    console.log("working")
  }

  function handleDelete() {
    setDeleteQ(true)
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
      <div>
        <h3>Are you sure you want to delete your account?</h3>
        <div>
          <button onClick={handleYes}>Yes</button>
          <button onClick={handleNo}>No</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <p>{user.username}</p>
      <img src={user.image_url} />
      <p>{user.email}</p>
      <div className="edit-delete-buttons">
        <button id="edit-button" onClick={handleEdit}>Edit Profile</button>
        <button id="delete-button" onClick={handleDelete}>Delete Profile</button>
      </div>
    </div>
  )
}

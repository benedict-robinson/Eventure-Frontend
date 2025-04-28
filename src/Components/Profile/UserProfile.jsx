import { useContext } from "react"
import { UserContext } from "../../Contexts/UserContext.jsx"


export default function UserProfile() {
    const { user } = useContext(UserContext)
  return (
    <div>
        <p>{user.username}</p>
        <img src={user.image_url} />
        <p>{user.email}</p>
    </div>
  )
}

import { useEffect, useState } from "react"
import { fetchGoing } from "../../api.js"
import EventCard from "../Main/EventCard.jsx"

export default function GoingList({user}) {
  const [userGoing, setUserGoing] = useState([])
  useEffect(() => {
    if (!user || !user.user_id) return;
    fetchGoing(user.user_id).then((response) => {
      setUserGoing(response)
    })
  }, [user])

  return (
    <div className="going-container">
      <h2>Going</h2>
      {userGoing.map((event, i) => {
        return <EventCard event={event} going={true} key={i} />
      })}
    </div>
  )
}

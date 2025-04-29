import { useEffect, useState } from "react"
import { fetchMyEvents } from "../../api.js"
import EventCard from "../Main/EventCard.jsx"

export default function MyEventsList({user}) {
  const [userMyEvents, setUserMyEvents] = useState([])
  useEffect(() => {
    fetchMyEvents(user.user_id).then((response) => {
      setUserMyEvents(response)
    })
  }, [user])

  return (
    <div className="my-events-container">
      <h2>My Events</h2>
      {userMyEvents.map((event, i) => {
        return <EventCard event={event} key={i}/>
      })}
    </div>
  )
}

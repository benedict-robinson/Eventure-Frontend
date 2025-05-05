import { useEffect, useState } from "react"
import { fetchMyEvents } from "../../api.js"
import EventCard from "../Main/EventCard.jsx"
import Loader from "../Main/Loader.jsx"
import { useNavigate } from "react-router-dom"
import "./CSS/Lists.css"

export default function MyEventsList({user}) {
  const [userMyEvents, setUserMyEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || !user.user_id) return;
    fetchMyEvents(user.user_id)
      .then((response) => {
        setUserMyEvents(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [user]);

  function goToCreate() {
    navigate("/account/create")
  }

  if (isLoading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    )
  }

  if (userMyEvents.length < 1) {
    return (
      <div className="my-events-container">
      <h2>My Events</h2>
      <div className="lists-container">
      <p onClick={goToCreate} id="create-new-tag">You haven't organised any events yet. Click here to create one!</p>
      </div>
    </div>
    )
  }

  return (
    <div className="my-events-container">
      <h2>My Events</h2>
      <div className="lists-container">
      {userMyEvents.map((event, i) => {
        return <EventCard event={event} key={i} myEvent={true} setUserMyEvents={setUserMyEvents}/>
      })}
      </div>
    </div>
  )
}

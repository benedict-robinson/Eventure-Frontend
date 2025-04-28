import HeartIconComp from "./HeartIcon.jsx";
import CalendarIconComp from "./CalendarIcon.jsx";
import { Link } from "react-router-dom"
import "./Main.css"
import { formatDate } from "../../utils.js";
import { useState } from "react";

export default function EventCard({ event }) {
  const [isFave, setIsFave] = useState(false)
  const [isGoing, setIsGoing] = useState(false)

  function handleClickFave() {
    setIsFave(!isFave)
  }
  function handleClickGoing() {
    setIsGoing(!isGoing)
  }

  return (
    <div className="event-card">
      <Link to={`/event/${event.event_id}`}>
        <div className="img-container">
          <img src={event.img.url} className="img" style={{ width: "100%", height: "100%", objectFit: 'cover' }} />
        </div>
        <h2>{event.name}</h2>
      </Link>
      <div className="sub-container">
      <p id="date">{formatDate(event.date_and_time.start_date)}</p>
      {event.tags.length > 0 ? <p id="tags" >Tags: {event.tags.filter(t => t !== "Undefined").join(", ")}</p> : <></>}
      <div className="button-container">
      <button onClick={handleClickFave}><HeartIconComp isFave={isFave} /></button>
      <button onClick={handleClickGoing}><CalendarIconComp isGoing={isGoing}/></button>
      </div>
      </div>
    </div>
  )
}

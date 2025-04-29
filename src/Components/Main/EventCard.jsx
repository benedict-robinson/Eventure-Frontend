import HeartIconComp from "./HeartIcon.jsx";
import CalendarIconComp from "./CalendarIcon.jsx";
import { Link } from "react-router-dom"
import "./Main.css"
import { formatDate } from "../../utils.js";
import { useEffect, useState } from "react";

export default function EventCard({ event, fave = false, going = false }) {
  const [isFave, setIsFave] = useState(false)
  const [isGoing, setIsGoing] = useState(false)

  useEffect(() => {
    setIsFave(fave)
    setIsGoing(going)
  }, [fave, going])


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
          <img src={event.img.url} className="img" />
        </div>
        <h2>{event.name}</h2>
      </Link>
      <div className="sub-container">
        <div className="date-and-tags">
          <p id="date">
            {event.date_and_time?.start_date
              ? formatDate(event.date_and_time.start_date)
              : "Date TBA"}
          </p>
          {event.tags.length > 0 ? <p id="tags" >Tags: {event.tags.filter(t => t !== "Undefined").join(", ")}</p> : <></>}
        </div>
        <div className="button-container">
          <button onClick={handleClickFave}><HeartIconComp isFave={isFave} /></button>
          <button onClick={handleClickGoing}><CalendarIconComp isGoing={isGoing} /></button>
        </div>
      </div>
    </div>
  )
}

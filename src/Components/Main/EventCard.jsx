import HeartIconComp from "./HeartIcon.jsx";
import CalendarIconComp from "./CalendarIcon.jsx";
import { Link } from "react-router-dom"
import "./Main.css"

export default function EventCard({ event }) {

  return (
    <div className="event-card">
      <Link to={`/event/${event.event_id}`}>
        <div className="img-container">
          <img src={event.img.url} className="img" style={{ width: "100%", height: "100%", objectFit: 'cover' }} />
        </div>
        <h2>{event.name}</h2>
      </Link>
      <p>{event.date_and_time.start_date}</p>
      <p>{event.date_and_time.start_time}</p>
      {event.tags.length > 0 ? <p>Tags: {event.tags.filter(t => t !== "Undefined").join(", ")}</p> : <></>}
      <button><HeartIconComp /></button>
      <button><CalendarIconComp /></button>
    </div>
  )
}

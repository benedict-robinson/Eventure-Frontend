import HeartIconComp from "./HeartIcon.jsx";
import CalendarIconComp from "./CalendarIcon.jsx";
import { Link } from "react-router-dom"
import "./Main.css"

export default function EventCard({ event }) {

  return (
    <div className="event-card">
      <Link to={`/event/${event.event_id}`}>
        <img src={event.img.url} className="img" style={{width: "100%", height: "100px", objectFit: 'contain'}}/>
        <h2>{event.name}</h2>
      </Link>
        <p>{event.date_and_time.start_date}</p>
        <p>{event.date_and_time.start_time}</p>
        <p>Tags: {event.tags.map(t => <span id="tag">{t} </span>)}</p>
      <button><HeartIconComp /></button>
      <button><CalendarIconComp /></button>
    </div>
  )
}

import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../Contexts/UserContext.jsx"
import { fetchMyEvents, patchEvent } from "../../api.js"
import Loader from "../Main/Loader.jsx"
import "../Main/Loader.css"
import "./EventEditor.css"

export default function EventEditor() {
  const { eventId } = useParams()
  const { user } = useContext(UserContext)
  const [event, setEvent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newEvent, setNewEvent] = useState({})
  const navigate = useNavigate()

  const date = new Date();
  const formattedLocalDate = date.getFullYear() + '-' +
    String(date.getMonth() + 1).padStart(2, '0') + '-' +
    String(date.getDate()).padStart(2, '0');

  useEffect(() => {
    if (!user || !user.user_id) return;
    fetchMyEvents(user.user_id)
      .then((events) => {
        const filteredEvents = events.filter((e) => e.event_id === Number(eventId));
        if (filteredEvents.length === 0) {
          throw new Error("Event not found");
        }
        setEvent(filteredEvents[0]);
      })
      .catch((err) => {
        console.log(err);
        setEvent({});
        setError("Not Authorized");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [eventId, user]);

  function editEvent(e) {
    const key = e.target.id;
    const value = e.target.value;
    if (key === "url") {
      setNewEvent((prev) => ({ ...prev, img: { [key]: value } }))
      return
    }
    setNewEvent((prev) => ({ ...prev, [key]: value }))
  }

  function handleTimeEdit(e) {
    const key = e.target.id;
    const value = e.target.value;
    setNewEvent((prev) => ({ ...prev, date_and_time: { [key]: value } }))
  }

  function handleDiscard() {
    navigate(`/event/${eventId}`)
  }

  function submitEdits() {
    patchEvent(user.username, eventId, newEvent)
      .then(() => {
        navigate(`/event/${eventId}`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (error) {
    return (
      <div className="error-div">
        <p>{error}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    )
  }

  if (event) {
    return (
      <div className="outer-container">
        <div className="event-page-container">
          <div className="img-div">
          <img src={event.img.url} />
          <input type="file" id="url" onChange={editEvent} />
          <label htmlFor="url">Change Image</label>
          </div>
          <div className="img-div">
          <input type="text" id="name" placeholder={event.name} onChange={editEvent} />
          </div>
          <div className="date-time">
            <div className="start-date-div">
            <input
              type="date"
              id="start_date"
              min={formattedLocalDate}
              onChange={handleTimeEdit} />
            <label htmlFor="start_date">Start Date</label>
            </div>
            <div className="start-time-div">
            <input
              type="time"
              id="start_time"
              onChange={handleTimeEdit} />
            <label htmlFor="start_time">Start Time</label>
            </div>
            <div className="end-date-div">
            <input
              type="date"
              id="end_date"
              min={formattedLocalDate}
              onChange={handleTimeEdit} />
            <label htmlFor="end_date">End Date</label>
            </div>
            <div className="end-time-div">
            <input
              type="time"
              id="end_time"
              onChange={handleTimeEdit} />
            <label htmlFor="end_time">End Time</label>
            </div>
          </div>
          <div className="info-div">
          <textarea id="description" placeholder={event.description ? event.description : `${EventTarget.name} in ${event.location.city}`} onChange={editEvent} />
          <textarea id="info" placeholder="Any extra info..." onChange={editEvent} />
          </div>
          <div className="url-div">
          <label htmlFor="url">For more info visit: </label>
          <input type="text" id="url" placeholder={event.url ? event.url : "Event Website..."} onChange={editEvent} />
          </div>
          <div className="buttons-div">
            <button onClick={submitEdits}>Save Changes</button>
            <button onClick={handleDiscard}>Discard Changes</button>
          </div>
        </div>
      </div>
    )
  }
}

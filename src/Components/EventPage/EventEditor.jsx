import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../Contexts/UserContext.jsx"
import { fetchMyEvents } from "../../api.js"
import { formatDate, formatTime } from "../../utils.js"

export default function EventEditor() {
  const { eventId } = useParams()
  const { user } = useContext(UserContext)
  const [event, setEvent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user || !user.user_id) return;
    fetchMyEvents(user.user_id)
      .then((events) => {
        const filteredEvents = events.filter((e) => e.event_id === Number(eventId));
        if (filteredEvents.length === 0) {
          throw new Error("Event not found");
        }
        console.log(filteredEvents[0])
        setEvent(filteredEvents[0]);
      })
      .catch((err) => {
        console.log(err);
        setEvent({});
        setError("Not Authorized");
      })
      .finally(() => {
        console.log(event)
        setIsLoading(false);
      });
  }, [eventId, user]);

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    )
  }

  if (event) {
  return (
          <div className="outer-container">
              <div className="event-page-container">
                  <img src={event.img.url} />
                  <h1>{event.name}</h1>
                  <div className="time-and-buttons">
                      <p>
                          {event.date_and_time?.start_date && typeof event.date_and_time?.start_date === "string"
                              ? formatDate(event.date_and_time.start_date)
                              : "Date TBA"}
                          {" - "}
                          {event.date_and_time?.start_time && typeof event.date_and_time?.start_time === "string"
                              ? formatTime(event.date_and_time.start_time)
                              : "Time TBA"}
                      </p>
                  </div>
                  <p id="description">{event.description ? event.description : `${EventTarget.name} in ${event.location.city}`}</p>
                  <p>{event.info}</p>
                  {event.url ? <p>For more info visit: <a href={event.url}>{event.url}</a></p> : <></>}
              </div>
          </div>
      )
    }
}

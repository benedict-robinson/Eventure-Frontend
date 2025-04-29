import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchEventById, fetchMyEvents } from "../../api.js"
import HeartIconComp from "../Main/HeartIcon.jsx";
import CalendarIconComp from "../Main/CalendarIcon.jsx";
import "./EventPage.css"
import { formatDate, formatTime } from "../../utils.js";
import { UserContext } from "../../Contexts/UserContext.jsx";

export default function EventPage() {
    const [event, setEvent] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { eventId } = useParams()
    const [isFave, setIsFave] = useState(false)
    const [isGoing, setIsGoing] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const { user } = useContext(UserContext)

    useEffect(() => {
        fetchEventById(eventId)
          .then((response) => {
            setEvent(response);
            return fetchMyEvents(user.user_id);
          })
          .then((response) => {
            console.log(response)
            const owner = response.filter(e => e.event_id === eventId);
            if (owner.length === 1) {
              setIsOwner(true);
            }
          })
          .catch((err) => {
            console.log(err);
            setEvent({});
            setIsOwner(false);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, [eventId, user]);

    function handleClickFave() {
        setIsFave(!isFave)
    }
    function handleClickGoing() {
        setIsGoing(!isGoing)
    }

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    if (isOwner) {
        return (
            <p>hello</p>
        )
    }

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
                    <div className="button-container">
                        <button onClick={handleClickFave}><HeartIconComp isFave={isFave} /></button>
                        <button onClick={handleClickGoing}><CalendarIconComp isGoing={isGoing} /></button>
                    </div>
                </div>
                <p id="description">{event.description ? event.description : `${EventTarget.name} in ${event.location.city}`}</p>
                <p>{event.info}</p>
                {event.url ? <p>For more info visit: <a href={event.url}>{event.url}</a></p> : <></>}
            </div>
        </div>
    )
}

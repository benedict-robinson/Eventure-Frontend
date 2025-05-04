import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchEventById } from "../../api.js"
import HeartIconComp from "../Main/HeartIcon.jsx";
import CalendarIconComp from "../Main/CalendarIcon.jsx";
import "./EventPage.css"
import { formatDate, formatTime } from "../../utils.js";
import { UserContext } from "../../Contexts/UserContext.jsx";
import Loader from "../Main/Loader.jsx";
import "../Main/Loader.css"

export default function EventPage() {
    const [event, setEvent] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { eventId } = useParams()
    const [isFave, setIsFave] = useState(false)
    const [isGoing, setIsGoing] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const { user } = useContext(UserContext)

    useEffect(() => {
        fetchEventById(eventId)
          .then((response) => {
            setEvent(response);
          })
          .catch((err) => {
            console.log(err);
            setEvent({});
            setErrMsg("No Event Found")
            setIsLoading(false)
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
            <div className="loader-container">
                <Loader />
            </div>
        )
    }

    if (errMsg) {
        return (
            <div>
                <h2>{errMsg}</h2>
            </div>
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

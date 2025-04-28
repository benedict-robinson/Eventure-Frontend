import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchEventById } from "../../api.js"
import HeartIconComp from "../Main/HeartIcon.jsx";
import CalendarIconComp from "../Main/CalendarIcon.jsx";
import "./EventPage.css"
import { formatDate, formatTime } from "../../utils.js";

export default function EventPage() {
    const [event, setEvent] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { eventId } = useParams()
    const [isFave, setIsFave] = useState(false)
    const [isGoing, setIsGoing] = useState(false)
  
    useEffect(() => {
        fetchEventById(eventId).then((response) => {
            console.log(response)
            setEvent(response)
        })
            .catch((err) => {
                console.log(err)
                setEvent({})
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [eventId])

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

    return (
        <div className="outer-container">
        <div className="event-page-container">
            <img src={event.img.url} />
            <h1>{event.name}</h1>
            <div className="time-and-buttons">
            <p>{formatDate(event.date_and_time.start_date)} - {formatTime(event.date_and_time.start_time)}</p>
            <div className="button-container">
            <button onClick={handleClickFave}><HeartIconComp isFave={isFave}/></button>
            <button onClick={handleClickGoing}><CalendarIconComp isGoing={isGoing}/></button>
            </div>
            </div>
            <p id="description">{event.description ? event.description : `${EventTarget.name} in ${event.location.city}`}</p>
            <p>{event.info}</p>
            {event.url ? <p>For more info visit: <a href={event.url}>{event.url}</a></p> : <></>}
        </div>
        </div>
    )
}

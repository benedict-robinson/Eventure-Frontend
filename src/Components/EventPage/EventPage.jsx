import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchEventById } from "../../api.js"
import HeartIconComp from "../Main/HeartIcon.jsx";
import CalendarIconComp from "../Main/CalendarIcon.jsx";

export default function EventPage() {
    const [event, setEvent] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { eventId } = useParams()
    useEffect(() => {
        fetchEventById(eventId).then((response) => {
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

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="event-page-container">
            <img src={event.img.url} />
            <h1>{event.name}</h1>
            <p>{event.date_and_time.start_date} - {event.date_and_time.start_time}</p>
            <p>{event.description ? event.description : `${EventTarget.name} in ${event.location.city}`}</p>
            <p>{event.info}</p>
            <button><HeartIconComp /></button>
            <button><CalendarIconComp /></button>
        </div>
    )
}

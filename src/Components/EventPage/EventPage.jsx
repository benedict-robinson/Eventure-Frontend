import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchEventById } from "../../api.js"

export default function EventPage() {
    const [event, setEvent] = useState({})
    const { eventId } = useParams()
    useEffect(() => {
        console.log(eventId)
        fetchEventById(eventId).then((response) => {
            setEvent(response)
        })
        .catch((err) => {
            console.log(err)
            setEvent({})
        })
    }, [eventId])
  return (
    <div className="event-page-container">
        <img src={event.img.url} />
        <h1>{event.name}</h1>
        <p>{event.date_and_time.start_date} - {event.date_and_time.start_time}</p>
        <p>{event.description}</p>
        <p>{event.info}</p>
    </div>
  )
}

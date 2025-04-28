import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchEventById } from "../../api.js"

export default function EventPage() {
    const [event, setEvent] = useState({})
    const [isLoading, setIsLoading] = useState(true)
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
    </div>
  )
}

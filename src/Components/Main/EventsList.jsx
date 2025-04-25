import { useEffect, useState } from "react"
import { fetchEvents } from "../../api.js"
import EventCard from "./EventCard.jsx"


export default function EventsList({params}) {
    const [events, setEvents] = useState([])
    useEffect(() => {
        console.log(params)
        fetchEvents(params).then(({events}) => {
            setEvents(events)
        })
    }, [params])
  return (
    <div className="eventslist-container">
        {events.map((e, i) => {
            return (
                <div className="event-card-container">
                    <EventCard key={i} event={e}/>
                </div>
            )
        })}
    </div>
  )
}

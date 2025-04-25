import { useEffect, useState } from "react"
import { fetchEvents } from "../../api.js"
import EventCard from "./EventCard.jsx"
import { Link } from "react-router-dom"


export default function EventsList({params, categoryName}) {
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchEvents(params).then(({events: fetched}) => {
            let newEvents = [...fetched]
            if (categoryName) {
                const regex = new RegExp(categoryName, "i")
                newEvents = newEvents.filter(e =>
                    e.tags.some(tag => regex.test(tag))
                  );
            }
            setEvents(newEvents)
        })
        .catch((err) => {
            console.log({error: err})
            setEvents([])
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [params, categoryName])

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

if (events.length === 0) {
    return (
        <div className="No-Events">
            <h2>Hmm... Looks like there are no{categoryName ? ` ${categoryName}` : ""} events scheduled in {params.city}</h2>
        </div>
    )
}

  return (
    <div className="eventslist-container">
        {events.map((e, i) => {
            return (
                <div className="event-card-container">
                    <Link to={`/event/${e.event_id}`}>
                    <EventCard key={i} event={e}/>
                    </Link>
                </div>
            )
        })}
    </div>
  )
}

import { useEffect, useState } from "react"
import { fetchEvents } from "../../api.js"
import EventCard from "./EventCard.jsx"


export default function EventsList({params, categoryName}) {
    const [events, setEvents] = useState([])
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
    }, [params, categoryName])
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

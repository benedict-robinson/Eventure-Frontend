import { useContext, useEffect, useState } from "react"
import { fetchEvents, fetchFavourites, fetchGoing } from "../../api.js"
import EventCard from "./EventCard.jsx"
import "./Main.css"
import Loader from "./Loader.jsx"
import "./Loader.css"
import { UserContext } from "../../Contexts/UserContext.jsx"


export default function EventsList({ params, categoryName }) {
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [faves, setUserFaves] = useState([])
    const [going, setUserGoing] = useState([])
    const { user } = useContext(UserContext)

    useEffect(() => {
        fetchEvents(params).then(({ events: fetched }) => {
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
                console.log({ error: err })
                setEvents([])
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [params, categoryName])

    useEffect(() => {
        fetchFavourites(user.user_id).then((response) => {
            setUserFaves(response)
            return fetchGoing(user.user_id)
        })
        .then((response) => {
            setUserGoing(response)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [user])

    if (isLoading) {
        return (
            <div className="loader-container">
                <Loader />
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
                const goingCurr = going.filter(g => g.event_id === e.event_id).length === 1
                const favesCurr = faves.filter(f => f.event_id === e.event_id).length === 1
                return (
                    <div className="event-card-container">
                        <EventCard key={i} event={e} fave={favesCurr} going={goingCurr} />
                    </div>
                )
            })}
        </div>
    )
}

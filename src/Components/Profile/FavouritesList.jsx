import { useEffect, useState } from "react"
import { fetchFavourites } from "../../api.js"
import EventCard from "../Main/EventCard.jsx"

export default function FavouritesList({user}) {
  const [userFaves, setUserFaves] = useState([])
  useEffect(() => {
    fetchFavourites(user.user_id).then((response) => {
      setUserFaves(response)
    })
  }, [user])

  return (
    <div className="favourites-container">
      <h2>Favourited Events</h2>
      {userFaves.map((event, i) => {
        return <EventCard event={event} fave={true} key={i} />
      })}
    </div>
  )
}

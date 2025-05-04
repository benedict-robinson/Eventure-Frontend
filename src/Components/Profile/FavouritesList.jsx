import { useEffect, useState } from "react"
import { fetchFavourites } from "../../api.js"
import EventCard from "../Main/EventCard.jsx"
import Loader from "../Main/Loader.jsx"
import "../Main/Loader.css"
import "./CSS/Lists.css"

export default function FavouritesList({user}) {
  const [userFaves, setUserFaves] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (!user || !user.user_id) return;
    fetchFavourites(user.user_id).then((response) => {
      setUserFaves(response)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [user])

  if (isLoading) {
      return (
        <div className="loader-container">
          <Loader />
        </div>
      )
    }

  return (
    <div className="lists-page-container">
      <h2>Favourited Events</h2>
      <div className="lists-container">
      {userFaves.map((event, i) => {
        return <EventCard event={event} fave={true} key={i} />
      })}
      </div>
    </div>
  )
}

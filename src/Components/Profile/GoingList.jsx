import { useEffect, useState } from "react"
import { fetchGoing } from "../../api.js"
import EventCard from "../Main/EventCard.jsx"
import Loader from "../Main/Loader.jsx"

export default function GoingList({user}) {
  const [userGoing, setUserGoing] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (!user || !user.user_id) return;
    fetchGoing(user.user_id).then((response) => {
      setUserGoing(response)
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
    <div className="going-container">
      <h2>Going</h2>
      {userGoing.map((event, i) => {
        return <EventCard event={event} going={true} key={i} />
      })}
    </div>
  )
}

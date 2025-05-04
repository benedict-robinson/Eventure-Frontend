import HeartIconComp from "./HeartIcon.jsx";
import CalendarIconComp from "./CalendarIcon.jsx";
import { Link, useNavigate } from "react-router-dom"
import "./Main.css"
import { formatDate } from "../../utils.js";
import { useContext, useEffect, useState } from "react";
import PencilButton from "./PencilButton.jsx";
import BinButton from "./BinButton.jsx";
import { deleteEvent, deleteNewFave, deleteNewGoing, postNewFave, postNewGoing } from "../../api.js";
import { UserContext } from "../../Contexts/UserContext.jsx";


export default function EventCard({ event, fave = false, going = false, myEvent = false, setUserMyEvents, setUserFaves, setUserGoing }) {
  const [isFave, setIsFave] = useState(false)
  const [isGoing, setIsGoing] = useState(false)
  const [deleteQ, setDeleteQ] = useState(false)
  const navigate = useNavigate()
  const {user} = useContext(UserContext)

  useEffect(() => {
    setIsFave(fave)
    setIsGoing(going)
  }, [fave, going])


  function handleClickFave() {
    if (!isFave) {
      postNewFave(user.user_id, {user_id: user.user_id, event_id: event.event_id}).then(() => {
        setIsFave(!isFave)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    else if (isFave) {
      deleteNewFave(user.user_id, event.event_id).then(() => {
        setUserFaves((prev) => {
          const newFaves = prev.filter(e => e.event_id !== event.event_id)
          return newFaves
        })
        setIsFave(!isFave)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
  function handleClickGoing() {
    if (!isGoing) {
      postNewGoing(user.user_id, {user_id: user.user_id, event_id: event.event_id}).then(() => {
        setIsGoing(!isGoing)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    if (isGoing) {
      deleteNewGoing(user.user_id, event.event_id).then(() => {
        setUserGoing((prev) => {
          const newGoing = prev.filter(e => e.event_id !== event.event_id)
          return newGoing
        })
        setIsGoing(!isGoing)
      })
    }
  }
  function handleClickEdit() {
    navigate(`/event/${event.event_id}/edit`)
  }
  function handleClickDelete() {
    setDeleteQ(!deleteQ)
  }
  function handleDelete() {
    deleteEvent(user.username, event.event_id)
      .then(() => {
        if (setUserMyEvents) {
          setUserMyEvents(prev => prev.filter(e => e.event_id !== event.event_id));
        }
        setDeleteQ(false);
      })
      .catch((err) => {
        console.error("Failed to delete event:", err);
        alert("Something went wrong while deleting the event.");
      });
  }

  return (
    <div className="event-card">
      <Link to={`/event/${event.event_id}`}>
        <div className="img-container">
          <img src={event.img.url} className="img" />
        </div>
        <h2>{event.name}</h2>
      </Link>
      <div className="sub-container">
        <div className="date-and-tags">
          <p id="date">
            {event.date_and_time?.start_date
              ? formatDate(event.date_and_time.start_date)
              : "Date TBA"}
          </p>
          {event.tags.length > 0 ? <p id="tags" >Tags: {event.tags.filter(t => t !== "Undefined").join(", ")}</p> : <></>}
        </div>
        <div className="button-container">
          <button onClick={handleClickFave}><HeartIconComp isFave={isFave} /></button>
          <button onClick={handleClickGoing}><CalendarIconComp isGoing={isGoing} /></button>
        </div>
        <div className="edit-delete">
          {myEvent ? <PencilButton editFunc={handleClickEdit} /> : <></>}
          {myEvent ? <BinButton deleteFunc={handleClickDelete} /> : <></>}
        </div>
        {deleteQ ?
          <div>
            <p>Are you sure you want to delete this article?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={handleClickDelete}>No</button>
          </div>
          : <></>}
      </div>
    </div>
  )
}

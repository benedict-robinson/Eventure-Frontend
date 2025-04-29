import { useEffect, useState } from "react";
import { ukCities, usCities } from "../../Info/cities.js"
import { postNewEvent } from "../../api.js";
import { useNavigate } from "react-router-dom";


export default function CreateEvent({user}) {
  const [newEvent, setNewEvent] = useState({ location: { country_code: "GB" }, img: {url: "https://source.unsplash.com/800x400/?event,people"}})
  const [cities, setCities] = useState(ukCities)
  const navigate = useNavigate();

  useEffect(() => {
    setCities(newEvent.location.country_code === "GB" ? ukCities : usCities)
  }, [newEvent])

  const date = new Date();
  const formattedLocalDate = date.getFullYear() + '-' +
    String(date.getMonth() + 1).padStart(2, '0') + '-' +
    String(date.getDate()).padStart(2, '0');

  function handleInput(e) {
    const key = e.target.id
    const value = e.target.value
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setNewEvent(prev => ({ ...prev, img: { url: file } }));
    }
    else {
      setNewEvent({ ...newEvent, [key]: value })
    }
  }

  function handleLocationInput(e) {
    const key = e.target.id;
    const value = e.target.value;
    const finalValue = value === "UK" ? "GB" : value;
    setNewEvent(prev => ({
      ...prev,
      location: {
        ...prev.location,  
        [key]: finalValue
      }
    }));
  }

  function handleTimeInput(e) {
    const key = e.target.id;
    const value = e.target.value;
    setNewEvent(prev => ({
      ...prev,
      date_and_time: {
        ...prev.date_and_time, 
        [key]: value
      }
    }));
  }

  function handleTags(e) {
    const tags = e.target.value.split(',').map(w => w.trim()).filter(Boolean);
    setNewEvent({ ...newEvent, tags: tags })
  }

  function handleSubmit(e) {
    e.preventDefault()
    postNewEvent(user.username, newEvent).then(({event_id}) => {
      navigate(`/event/${event_id}`)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="create-event-container">
      <h2>Create New Event</h2>
      <form>
        <label htmlFor="name">What's your event called?</label>
        <input type="text" id="name" placeholder="Name" onChange={handleInput} required></input>
        <label htmlFor="start_date">What day is your event?</label>
        <input
          type="date"
          id="start_date"
          min={formattedLocalDate}
          onChange={handleTimeInput} />
        <label htmlFor="start_time">When does your event start?</label>
        <input
          type="time"
          id="start_time"
          onChange={handleTimeInput} />
        <label htmlFor="end_date">What day does your event finish?</label>
        <input
          type="date"
          id="end_date"
          min={formattedLocalDate}
          onChange={handleTimeInput} />
        <label htmlFor="end_time">When does your event end?</label>
        <input
          type="time"
          id="end_time"
          onChange={handleTimeInput} />
        <label htmlFor="country_code">Where is your event?</label>
        <select id="country_code" placeholder="GB" onChange={handleLocationInput}>
          <option>UK</option>
          <option>US</option>
        </select>
        <label htmlFor="city">In what city?</label>
        <select id="city" onChange={handleLocationInput}>
          {cities.map((city, i) => {
            return <option key={i}>{city}</option>
          })}
        </select>
        <label htmlFor="description">Tell us a bit about it!</label>
        <textarea type="text" id="description" placeholder="Description" onChange={handleInput} required></textarea>
        <label htmlFor="img">Let's see a picture of the event!</label>
        <input type="file" id="img" accept="image/*" onChange={handleInput} />
        <label>What are some tags for your event?</label>
        <input
          type="text"
          placeholder="Enter keywords, separated by commas"
          id="tags"
          onChange={handleTags} />
        <label htmlFor="url">Is there a link to find out more?</label>
        <input
          type="url"
          name="url"
          id="url"
          placeholder="https://example.com"
          pattern="https://.*"
          onChange={handleInput}
          size="30" />
      </form>
      <button onClick={handleSubmit} disabled={!newEvent.name || !newEvent.description || !newEvent.tags}>Upload Event</button>
    </div>
  )
}

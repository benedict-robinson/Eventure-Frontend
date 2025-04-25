

export default function EventCard({event}) {
  return (
    <div className="event-card">
      <img src={event.img.url} />
      <h2>{event.name}</h2>
      <p>{event.date_and_time.start_date}</p>
      <p>{event.date_and_time.start_time}</p>
      <p>Tags: {event.tags.map(t => <span id="tag">{t}</span>)}</p>
    </div>
  )
}

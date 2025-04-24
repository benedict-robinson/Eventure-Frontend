import { useState } from "react";
import EventsList from "./EventsList.jsx";
import TagLine from "./TagLine.jsx";


export default function MainPage() {
    const [params, setParams] = useState({countryCode: "GB", city: "London"})
  return (
    <div className="main-container">
        <TagLine {...{params, setParams}}/>
        <EventsList {...{params}}/>
    </div>
  )
}

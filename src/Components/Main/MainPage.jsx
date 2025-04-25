import { useEffect, useState } from "react";
import EventsList from "./EventsList.jsx";
import TagLine from "./TagLine.jsx";
import { useParams } from "react-router-dom";


export default function MainPage() {
  const [params, setParams] = useState({countryCode: "GB", city: "London"})
  const { categoryName } = useParams();
  
  return (
    <div className="main-container">
        <TagLine {...{params, setParams, categoryName}}/>
        <EventsList {...{params, categoryName}}/>
    </div>
  )
}

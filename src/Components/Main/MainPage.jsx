import { useState, useEffect } from "react";
import EventsList from "./EventsList.jsx";
import TagLine from "./TagLine.jsx";
import { useParams } from "react-router-dom";

const STORAGE_KEY = "myApp-params";

export default function MainPage() {
  const [params, setParams] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : { countryCode: "GB", city: "London" };
  });

  const { categoryName } = useParams();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  }, [params]);
  
  return (
    <div className="main-container">
        <TagLine {...{params, setParams, categoryName}}/>
        <EventsList {...{params, categoryName}}/>
    </div>
  )
}

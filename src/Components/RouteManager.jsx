import { Routes, Route } from 'react-router-dom'
import MainPage from './Main/MainPage.jsx'
import EventPage from './EventPage/EventPage.jsx'

export default function RouteManager() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}/>
      <Route path="/category/:categoryName" element={<MainPage />} />
      <Route path="/event/:eventId" element={<EventPage />} />
    </Routes>
  )
}

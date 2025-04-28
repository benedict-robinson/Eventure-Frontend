import { Routes, Route } from 'react-router-dom'
import MainPage from './Main/MainPage.jsx'
import EventPage from './EventPage/EventPage.jsx'
import AccountPage from './Profile/AccountPage.jsx'

export default function RouteManager() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}/>
      <Route path="/category/:categoryName" element={<MainPage />} />
      <Route path="/event/:eventId" element={<EventPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/account/:item" element={<AccountPage />} />
    </Routes>
  )
}

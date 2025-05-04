import { Routes, Route } from 'react-router-dom'
import MainPage from './Main/MainPage.jsx'
import EventPage from './EventPage/EventPage.jsx'
import AccountPage from './Profile/AccountPage.jsx'
import EventEditor from './EventPage/EventEditor.jsx'
import SignIn from './Profile/SignIn.jsx'
import NewUser from "./Profile/NewUser.jsx"
import ErrorHandler from './Main/ErrorHandler.jsx'

export default function RouteManager() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}/>
      <Route path="/category/:categoryName" element={<MainPage />} />
      <Route path="/event/:eventId" element={<EventPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/account/:item" element={<AccountPage />} />
      <Route path="/event/:eventId/edit" element={<EventEditor />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/new-user" element={<NewUser />} />
      <Route path="*" element={<ErrorHandler error={"Invalid Route"}/>} />
    </Routes>
  )
}

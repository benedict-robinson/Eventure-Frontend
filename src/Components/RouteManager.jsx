import { Routes, Route } from 'react-router-dom'
import MainPage from './Main/MainPage.jsx'

export default function RouteManager() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}/>
      <Route path="/category/:categoryName" element={<MainPage />} />
    </Routes>
  )
}

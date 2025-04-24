import { useEffect } from 'react'
import { fetchEvents } from './api.js'
import RouteManager from './Components/RouteManager.jsx'
import TopBar from './Components/TopBar/TopBar.jsx'

function App() {
  useEffect(() => {
    fetchEvents().then(({events}) => {
      console.log(events)
    })
  }, [])

  return (
    <>
    <TopBar />
    <RouteManager />
    </>
  )
}

export default App

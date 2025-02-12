import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReservationSystem from './components/RestaurantReservation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ReservationSystem/>
    </>
  )
}

export default App

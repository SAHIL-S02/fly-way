import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import PassengerData from './contexts/PassengerData.jsx'
import FlightData from './contexts/FlightData.jsx'
import AllFlightData from './contexts/allFlightData.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PassengerData>
        <FlightData>
          <AllFlightData>
            <App />
          </AllFlightData>
        </FlightData>
      </PassengerData>
    </BrowserRouter>
  </StrictMode>,
)

import React from 'react'
import { createContext } from 'react'
import { useState } from 'react';

export const flightDataContext = createContext();

const FlightData = ({children}) => {
    const [flightData, setFlightData] = useState({});
    return (
        <flightDataContext.Provider value={{flightData, setFlightData}}>
            {children}
        </flightDataContext.Provider>
    )
}

export default FlightData

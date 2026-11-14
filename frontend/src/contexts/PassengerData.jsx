import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'

export const PassengerDataContext = createContext();

const PassengerData = ({children}) => {
    const [passengerData, setPassengerData] = useState([]);
    return (
        <PassengerDataContext.Provider value={{passengerData, setPassengerData}}>{children}</PassengerDataContext.Provider>
    )
}

export default PassengerData

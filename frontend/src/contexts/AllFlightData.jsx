import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'

export const AllFlightDataContext = createContext();


const AllFlightData = ({children}) => {
    const [allFlightData, setAllFlightData] = useState([
    {
        id: 1,
        airlines: 'IndiGo',
        departureTime: '06:30 AM',
        arrivalTime: '09:15 AM',
        price: 4500,
        stops: 0,
        duration: '2h 45m',
        layout:1,
    },
    {
        id: 2,
        airlines: 'Air India',
        departureTime: '08:30 AM',
        arrivalTime: '11:45 AM',
        price: 6200,
        stops: 1,
        duration: '3h 15m',
        layout:2,
    },
    {
        id: 3,
        airlines: 'Vistara',
        departureTime: '10:00 AM',
        arrivalTime: '12:30 PM',
        price: 5800,
        stops: 0,
        duration: '2h 30m',
        layout:2,
    },
    {
        id: 4,
        airlines: 'SpiceJet',
        departureTime: '11:45 AM',
        arrivalTime: '03:15 PM',
        price: 3900,
        stops: 1,
        duration: '3h 30m',
        layout:1,
    },
    {
        id: 5,
        airlines: 'IndiGo',
        departureTime: '01:30 PM',
        arrivalTime: '04:00 PM',
        price: 5100,
        stops: 0,
        duration: '2h 30m',
        layout:2,
    },
    {
        id: 6,
        airlines: 'Air India',
        departureTime: '03:00 PM',
        arrivalTime: '07:30 PM',
        price: 7200,
        stops: 2,
        duration: '4h 30m',
        layout:1,
    },
    {
        id: 7,
        airlines: 'Akasa Air',
        departureTime: '04:45 PM',
        arrivalTime: '07:30 PM',
        price: 4300,
        stops: 0,
        duration: '2h 45m',
        layout:2,
    },
    {
        id: 8,
        airlines: 'IndiGo',
        departureTime: '06:00 PM',
        arrivalTime: '09:45 PM',
        price: 4800,
        stops: 1,
        duration: '3h 45m',
        layout:1,
    },
    {
        id: 9,
        airlines: 'SpiceJet',
        departureTime: '08:15 PM',
        arrivalTime: '11:00 PM',
        price: 4100,
        stops: 0,
        duration: '2h 45m',
        layout:2,
    },
    {
        id: 10,
        airlines: 'Air India',
        departureTime: '10:30 PM',
        arrivalTime: '03:00 AM',
        price: 6800,
        stops: 1,
        duration: '4h 30m',
        layout:1,
    }]);
    return (
    <AllFlightDataContext.Provider
        value={{
            allFlightData,
            setAllFlightData
        }}
    >
        {children}
    </AllFlightDataContext.Provider>
);
}

export default AllFlightData;

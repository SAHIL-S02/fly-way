import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { faPlaneArrival } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
//context data
import { flightDataContext } from '../contexts/FlightData';
import { AllFlightDataContext } from '../contexts/allFlightData';

const Home = () => {
    const {flightData, setFlightData} = useContext(flightDataContext);

    const flightContext = useContext(AllFlightDataContext);

    const {allFlightData} = useContext(AllFlightDataContext);
    console.log(allFlightData);
    const [search, setSearch] = useState(false);
    
    const today = new Date();
    const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const navigate = useNavigate();
    const handleTicket = (layout)=>{
        navigate(layout==1 ? "/ticket":"/ticket2");
    }

    const [fillData, setFillData] = useState({
        "departure": true,
        "arrival" : true,
        "date" : true,
        "passengers" : true,
    });
    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const departure = formData.get('departure').trim();
        const arrival = formData.get('arrival').trim();
        const date = formData.get('date');
        const passengers = Number(formData.get('passengers'));
        setFillData({
            departure: !!departure,
            arrival: !!arrival,
            date: !!date,
            passengers: passengers >= 1,
        });
        if (!departure || !arrival || !date || passengers < 1) {
            alert('Please fill in all the fields.');
            return;
        }
        if (departure.toLowerCase() === arrival.toLowerCase()) {
            alert('Departure and arrival locations cannot be the same.');
            return;
        }
        setFlightData({
            departure,
            arrival,
            date,
            passengers
        });
        setSearch(true);
        console.log("Search data : ", fillData);

    }
    return (
        <div className='hero'>
            <div className='flex items-center justify-around flex-col h-[70%]'>
                <h1 className={`font-bold text-8xl w-[50%] text-center bg-gradient-to-r
                from-[#4E88FD]
                via-[#6D57FD]
                to-[#747EFD]
                bg-clip-text
                text-transparent opacity-100 ${search? "hidden":""}`}>It's more than just a trip</h1>
                <form onSubmit={handleSubmit} className='flightInput flex justify-between flex-row w-[70%] h-12 rounded-md border-[#CBD4E6] border-1 shadow-md shadow-[#CBD4E6] bg-[#ffffff] flex-wrap'>
                    <div className={`border-r px-2 border-[#CBD4E6] w-[25%] h-full flex items-center justify-between gap-3.5 ${fillData.departure? "":"border border-red-600 "}`}>
                        <label htmlFor='departure'>
                            <FontAwesomeIcon
                            icon={faPlaneDeparture}
                            className="text-[#6E7491] text-xl"
                        />
                        </label>
                        <input type="text" id='departure' name='departure' className={`h-full text-lg outline-none ${fillData.departure? "":"placeholder:text-red-700"}`} placeholder="From where?"/>
                    </div>
                    <div className={`border-r px-2 border-[#CBD4E6] w-[25%] h-full flex items-center justify-between gap-3.5  ${fillData.arrival? "":"border border-red-600 "}`}>
                        <label htmlFor="arrival">
                            <FontAwesomeIcon
                                icon={faPlaneArrival}
                                className="text-[#6E7491] text-xl"
                            />
                        </label>
                        <input type="text" id="arrival" name='arrival' className={`h-full text-lg outline-none ${fillData.arrival ? "":"placeholder:text-red-700"}`} placeholder="Where to?"/>
                    </div>
                    <div className={`border-r px-2 border-[#CBD4E6] w-[20%] h-full flex items-center justify-between gap-3.5 ${fillData.date ? "" : "border border-red-600 "}`}>
                        <label htmlFor="date">
                            <FontAwesomeIcon
                                icon={faCalendarDay}
                                className="text-[#6E7491] text-xl"
                            />
                        </label>
                        <input type="date" id='date' min={minDate} name='date' className={`h-full text-lg outline-none ${fillData.date ? "" : "placeholder:text-red-700"}`} placeholder="Depart - Return"/>
                    </div>
                    <div className={`px-2 border-[#CBD4E6] w-[20%] h-full flex items-center justify-between gap-3.5 ${fillData.passengers? "" : "border border-red-600 "}`}>
                        <label htmlFor="passenger">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="text-[#6E7491] text-xl"
                            />
                        </label>
                        <input type="number" min="1" defaultValue="1" id='passenger' name='passengers' className={`h-full text-lg outline-none ${fillData.passengers? "":"placeholder:text-red-700"}`} placeholder="Passenger"/>
                    </div>
                    
                    <button type='submit' className='w-[10%] bg-[#605DEC] rounded-md text-[#ffffff] hover:bg-[#2e2bc8]'>Search</button>
                </form>
                <div className={`flightList cursor-pointer ${!search? "hidden":""} w-[70%] m-5 mt-20 p-5 rounded-2xl overflow-x-hidden overflow-y-auto scrollbar-hide border-[#CBD4E6] border shadow-md bg-white`}>
                    {allFlightData.map((flight) =>(
                        <div key={flight.id} onClick={() => handleTicket(flight.layout)} className='w-full flex justify-between px-3 py-2 my-3 border-b-2 border-[#CBD4E6]'>
                            {/* name logo */}
                            <div className='logoName flex gap-4 px-4'>
                                <div className='logo size-8 rounded-full m-0 bg-amber-600 text-center font-extrabold text-2xl'>
                                    <img src={`${flight.airlines}.jpg`} className='w-full h-full' alt="" />
                                </div>
                                <div className='flightName flex flex-col justify-between'>
                                    <p className='duration text-lg '>
                                        {flight.duration} 
                                    </p>
                                    <p className='text-gray-500 text-sm'>
                                        {flight.airlines}
                                    </p>
                                </div>
                            </div>
                            {/* time */}
                            <div className='flex flex-col items-center'>
                                <p className='text-lg font-bold'>
                                    {flight.departureTime} - {flight.arrivalTime}
                                </p>
                                <p className='text-gray-500'>
                                    {flightData.departure} - {flightData.arrival}
                                </p>
                            </div>
                            {/* stops */}
                            <div className='flex flex-col'>
                                <p className='font-bold'>
                                    {flight.stops == 0? "Non Stop":flight.stops+" " + "stop"}
                                </p>
                                <p className='text-xs text-gray-500'>
                                    {flight.layout == 1? "3-2 Layout":"2-3-2 Layout"}
                                </p>
                            </div>
                            {/*price*/}
                            <div className='price '>
                                <p className='text-lg'>
                                    ₹{flight.price}
                                </p>
                                <p className='text-sm text-gray-500'>One way</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home

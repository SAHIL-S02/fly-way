import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlaneDeparture,
    faPlaneArrival,
    faCalendarDay,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'

// Context data
import { flightDataContext } from '../contexts/FlightData';
import { AllFlightDataContext } from '../contexts/AllFlightData.jsx';

const Home = () => {

    const flightContext = useContext(flightDataContext);
    const flightData = flightContext?.flightData ?? {};
    const setFlightData = flightContext?.setFlightData;

    const allFlightContext = useContext(AllFlightDataContext);

    const allFlightData = Array.isArray(allFlightContext?.allFlightData)
        ? allFlightContext.allFlightData
        : [];

    const [search, setSearch] = useState(false);

    const today = new Date();

    const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const navigate = useNavigate();

    const handleTicket = (layout) => {
        navigate(Number(layout) === 1 ? "/ticket" : "/ticket2");
    }

    const [fillData, setFillData] = useState({
        departure: true,
        arrival: true,
        date: true,
        passengers: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const departure = String(formData.get('departure') ?? '').trim();
        const arrival = String(formData.get('arrival') ?? '').trim();
        const date = String(formData.get('date') ?? '').trim();
        const passengers = Number(formData.get('passengers'));

        const validDeparture = departure.length > 0;
        const validArrival = arrival.length > 0;
        const validDate = date.length > 0 && date >= minDate;
        const validPassengers = Number.isSafeInteger(passengers) && passengers >= 1;

        setFillData({
            departure: validDeparture,
            arrival: validArrival,
            date: validDate,
            passengers: validPassengers,
        });

        if (!validDeparture || !validArrival || !validDate || !validPassengers) {
            alert('Please fill in all fields with valid values.');
            return;
        }

        if (departure.toLowerCase() === arrival.toLowerCase()) {
            alert('Departure and arrival locations cannot be the same.');
            return;
        }

        setFlightData?.({
            departure,
            arrival,
            date,
            passengers
        });

        setSearch(true);
    }

    return (
        <div className='hero w-full'>

            <div className='flex items-center justify-start flex-col min-h-[70%] h-auto py-8 gap-8'>

                {/* Heading */}
                <h1
                    className={`font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl w-[90%] lg:w-[50%] text-center bg-gradient-to-r
                    from-[#4E88FD]
                    via-[#6D57FD]
                    to-[#747EFD]
                    bg-clip-text
                    text-transparent opacity-100
                    ${search ? "hidden" : ""}`}
                >
                    It's more than just a trip
                </h1>


                {/* Search Form */}
                <form
                    onSubmit={handleSubmit}
                    className='flightInput flex flex-col md:flex-row md:flex-wrap
                    justify-between w-[94%] sm:w-[90%] lg:w-[70%]
                    h-auto md:h-12 rounded-md
                    border-[#CBD4E6] border shadow-md shadow-[#CBD4E6]
                    bg-white overflow-hidden'
                >

                    {/* Departure */}
                    <div
                        className={`border-b md:border-b-0 md:border-r px-3
                        border-[#CBD4E6] w-full md:w-[25%] h-12 md:h-full
                        flex items-center gap-3
                        ${fillData.departure ? "" : "border border-red-600"}`}
                    >
                        <label htmlFor='departure' className='shrink-0'>
                            <FontAwesomeIcon
                                icon={faPlaneDeparture}
                                className="text-[#6E7491] text-xl"
                            />
                        </label>

                        <input
                            type="text"
                            id='departure'
                            name='departure'
                            required
                            autoComplete='off'
                            className={`h-full min-w-0 flex-1 text-base sm:text-lg outline-none
                            ${fillData.departure ? "" : "placeholder:text-red-700"}`}
                            placeholder="From where?"
                        />
                    </div>


                    {/* Arrival */}
                    <div
                        className={`border-b md:border-b-0 md:border-r px-3
                        border-[#CBD4E6] w-full md:w-[25%] h-12 md:h-full
                        flex items-center gap-3
                        ${fillData.arrival ? "" : "border border-red-600"}`}
                    >
                        <label htmlFor="arrival" className='shrink-0'>
                            <FontAwesomeIcon
                                icon={faPlaneArrival}
                                className="text-[#6E7491] text-xl"
                            />
                        </label>

                        <input
                            type="text"
                            id="arrival"
                            name='arrival'
                            required
                            autoComplete='off'
                            className={`h-full min-w-0 flex-1 text-base sm:text-lg outline-none
                            ${fillData.arrival ? "" : "placeholder:text-red-700"}`}
                            placeholder="Where to?"
                        />
                    </div>


                    {/* Date */}
                    <div
                        className={`border-b md:border-b-0 md:border-r px-3
                        border-[#CBD4E6] w-full md:w-[20%] h-12 md:h-full
                        flex items-center gap-3
                        ${fillData.date ? "" : "border border-red-600"}`}
                    >
                        <label htmlFor="date" className='shrink-0'>
                            <FontAwesomeIcon
                                icon={faCalendarDay}
                                className="text-[#6E7491] text-xl"
                            />
                        </label>

                        <input
                            type="date"
                            id='date'
                            min={minDate}
                            name='date'
                            required
                            className={`h-full min-w-0 flex-1 text-sm sm:text-base outline-none
                            ${fillData.date ? "" : "text-red-700"}`}
                        />
                    </div>


                    {/* Passengers */}
                    <div
                        className={`px-3 w-full md:w-[20%] h-12 md:h-full
                        flex items-center gap-3
                        ${fillData.passengers ? "" : "border border-red-600"}`}
                    >
                        <label htmlFor="passenger" className='shrink-0'>
                            <FontAwesomeIcon
                                icon={faUser}
                                className="text-[#6E7491] text-xl"
                            />
                        </label>

                        <input
                            type="number"
                            min="1"
                            step="1"
                            defaultValue="1"
                            id='passenger'
                            name='passengers'
                            required
                            className={`h-full min-w-0 flex-1 text-base sm:text-lg outline-none
                            ${fillData.passengers ? "" : "placeholder:text-red-700"}`}
                            placeholder="Passenger"
                        />
                    </div>


                    {/* Search Button */}
                    <button
                        type='submit'
                        className='w-full md:w-[10%] h-12 md:h-full
                        bg-[#605DEC] rounded-b-md md:rounded-none md:rounded-r-md
                        text-white hover:bg-[#2e2bc8]
                        transition-colors duration-200'
                    >
                        Search
                    </button>

                </form>


                {/* Flight List */}
                <div
                    className={`flightList cursor-pointer
                    ${!search ? "hidden" : ""}
                    w-[94%] sm:w-[90%] lg:w-[70%]
                    max-h-[65vh] m-3 sm:m-5 mt-4 sm:mt-10
                    p-3 sm:p-5 rounded-2xl
                    overflow-x-hidden overflow-y-auto scrollbar-hide
                    border-[#CBD4E6] border shadow-md bg-white`}
                >

                    {allFlightData.length > 0 ? (

                        allFlightData.map((flight, index) => {

                            // Handle invalid flight objects
                            if (!flight || typeof flight !== 'object') {
                                return null;
                            }

                            const airlineName = flight.airlines || 'Airline';

                            const stops = Number(flight.stops);

                            return (

                                <div
                                    key={`${flight.id ?? 'flight'}-${index}`}
                                    onClick={() => handleTicket(flight.layout)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleTicket(flight.layout);
                                        }
                                    }}
                                    role="button"
                                    tabIndex={0}
                                    className='w-full grid grid-cols-2 sm:grid-cols-4
                                    gap-4 items-center px-2 sm:px-3 py-4 my-3
                                    border-b-2 border-[#CBD4E6]
                                    hover:bg-gray-50 transition-colors duration-200
                                    rounded-md'
                                >

                                    {/* Airline Logo and Name */}
                                    <div className='logoName flex gap-3 sm:gap-4
                                    items-center px-1 sm:px-4
                                    col-span-2 sm:col-span-1 min-w-0'>

                                        <div className='logo size-8 shrink-0 rounded-full
                                        bg-amber-600 text-center font-extrabold
                                        text-2xl overflow-hidden'>

                                            {flight.airlines && (
                                                <img
                                                    src={`${flight.airlines}.jpg`}
                                                    className='w-full h-full object-cover'
                                                    alt={airlineName}
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            )}

                                        </div>

                                        <div className='flightName flex flex-col
                                        justify-between min-w-0'>

                                            <p className='duration text-base sm:text-lg
                                            break-words'>
                                                {flight.duration ?? "—"}
                                            </p>

                                            <p className='text-gray-500 text-xs sm:text-sm
                                            break-words'>
                                                {airlineName}
                                            </p>

                                        </div>

                                    </div>


                                    {/* Flight Time */}
                                    <div className='flex flex-col items-start sm:items-center
                                    min-w-0'>

                                        <p className='text-sm sm:text-lg font-bold
                                        break-words'>
                                            {flight.departureTime ?? "—"} - {flight.arrivalTime ?? "—"}
                                        </p>

                                        <p className='text-gray-500 text-xs sm:text-sm
                                        break-words'>
                                            {flightData.departure || "—"} - {flightData.arrival || "—"}
                                        </p>

                                    </div>


                                    {/* Stops and Layout */}
                                    <div className='flex flex-col min-w-0'>

                                        <p className='font-bold text-sm sm:text-base'>

                                            {!Number.isFinite(stops)
                                                ? "—"
                                                : stops === 0
                                                    ? "Non Stop"
                                                    : `${stops} ${stops === 1 ? "stop" : "stops"}`
                                            }

                                        </p>

                                        <p className='text-xs text-gray-500'>
                                            {flight.layout == 1
                                                ? "3-2 Layout"
                                                : "2-3-2 Layout"}
                                        </p>

                                    </div>


                                    {/* Price */}
                                    <div className='price min-w-0'>

                                        <p className='text-base sm:text-lg font-medium
                                        break-words'>

                                            {flight.price != null
                                                ? `₹${flight.price}`
                                                : "Price unavailable"
                                            }

                                        </p>

                                        <p className='text-xs sm:text-sm text-gray-500'>
                                            One way
                                        </p>

                                    </div>

                                </div>

                            );
                        })

                    ) : (

                        /* Empty State */
                        <div className='flex flex-col items-center
                        justify-center py-10 text-center'>

                            <h2 className='text-lg sm:text-xl font-semibold
                            text-gray-700'>
                                No flights available
                            </h2>

                            <p className='text-sm text-gray-500 mt-2'>
                                There are currently no flights to display.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
    )
}

export default Home;
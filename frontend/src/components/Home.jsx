import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { faPlaneArrival } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
    return (
        <div className='hero'>
            <div className='flex items-center justify-around flex-col h-[70%]'>
                <h1 className=' font-bold text-8xl w-[50%] text-center bg-gradient-to-r
                from-[#4E88FD]
                via-[#6D57FD]
                to-[#747EFD]
                bg-clip-text
                text-transparent opacity-100 '>It's more than just a trip</h1>
                <form action="" className='flightInput flex justify-between flex-row w-[70%] h-12 rounded-md border-[#CBD4E6] border-1 shadow-md shadow-[#CBD4E6] bg-[#ffffff] flex-wrap'>
                    <div className='border-r-1 px-2 border-[#CBD4E6] w-[25%] h-full flex items-center justify-between gap-3.5'>
                        <label htmlFor='departure'>
                            <FontAwesomeIcon
                            icon={faPlaneDeparture}
                            className="text-[#6E7491] text-xl"
                        />
                        </label>
                        <input type="text" id='departure' className='h-full text-lg outline-none' placeholder="From where?"/>
                    </div>
                    <div className='border-r-1 px-2 border-[#CBD4E6] w-[25%] h-full flex items-center justify-between gap-3.5'>
                        <label htmlFor="arrival">
                            <FontAwesomeIcon
                                icon={faPlaneArrival}
                                className="text-[#6E7491] text-xl"
                            />
                        </label>
                        <input type="text" id="arrival" className='h-full text-lg outline-none' placeholder="Where to?"/>
                    </div>
                    <div className='border-r-1 px-2 border-[#CBD4E6] w-[20%] h-full flex items-center justify-between gap-3.5'>
                        <label htmlFor="date">
                            <FontAwesomeIcon
                                icon={faCalendarDay}
                                className="text-[#6E7491] text-xl"
                            />
                        </label>
                        <input type="date" id='date' className='h-full text-lg outline-none' placeholder="Depart - Return"/>
                    </div>
                    <div className='px-2 border-[#CBD4E6] w-[20%] h-full flex items-center justify-between gap-3.5'>
                        <label htmlFor="passenger">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="text-[#6E7491] text-xl"
                            />
                        </label>
                        <input type="number" id='passenger' className='h-full text-lg outline-none' placeholder="Passenger"/>
                    </div>
                    
                    <button type='submit' className='w-[10%] bg-[#605DEC] rounded-md text-[#ffffff] hover:bg-[#2e2bc8]'>Search</button>
                </form>
            </div>
        </div>
    )
}

export default Home

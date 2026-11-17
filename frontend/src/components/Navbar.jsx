import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='navBar sticky top-0 left-0 z-50
        bg-[#FFFFFF] w-full min-h-20 h-auto sm:h-20
        flex flex-col sm:flex-row
        justify-between items-center
        px-4 sm:px-6 lg:px-10 py-3
        gap-3 sm:gap-0 varela-round-regular'>

            {/* Logo */}
            <NavLink to={'/'} className='logo shrink-0'>
                <h1 className='font-extrabold text-2xl sm:text-3xl text-[#605DEC]'>
                    Fly Way
                </h1>
            </NavLink>


            {/* Navigation Links */}
            <div className='navButtonBox
            w-full sm:w-[55%] md:w-[45%] lg:w-[30%]
            flex justify-between items-center
            gap-2 sm:gap-4'>

                <NavLink
                    to={'/flights'}
                    className={"text-[#605DEC] text-sm sm:text-base whitespace-nowrap"}
                >
                    Flights
                </NavLink>

                <NavLink
                    to={'/hotels'}
                    className={"text-[#7C8DB0] text-sm sm:text-base whitespace-nowrap"}
                >
                    Hotels
                </NavLink>

                <NavLink
                    to={'/packages'}
                    className={"text-[#7C8DB0] text-sm sm:text-base whitespace-nowrap"}
                >
                    Packages
                </NavLink>

                {/* Profile */}
                <NavLink
                    to={'/profile'}
                    aria-label="Profile"
                    className={"size-9 sm:size-10 shrink-0 flex items-center justify-center text-[#ffffff] font-extralight bg-[#605DEC] rounded-full"}
                >
                    R
                </NavLink>

            </div>

        </nav>
    )
}

export default Navbar
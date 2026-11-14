import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='navBar sticky top-0 left-0 bg-[#FFFFFF] w-full h-20 flex justify-between items-center px-10 py-3 varela-round-regular'>
            <NavLink to={'/'} className='logo '>
                <h1 className='font-extrabold text-3xl text-[#605DEC]'>
                    Fly Way
                </h1>
            </NavLink>
            <div className='navButtonBox w-[30%] flex justify-between items-center'>
                <NavLink to={'/flights'} className={"text-[#605DEC]"}>Flights</NavLink>
                <NavLink to={'/hotels'} className={"text-[#7C8DB0]"}>Hotels</NavLink>
                <NavLink to={'/packages'} className={"text-[#7C8DB0]"}>Packages</NavLink>
                <NavLink to={'/profile'} className={"size-10 flex items-center justify-center text-[#ffffff] font-extralight bg-[#605DEC] rounded-full"}>R</NavLink>
            </div>
        </nav>
    )
}

export default Navbar

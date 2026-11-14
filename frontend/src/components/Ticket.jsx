import { flightDataContext } from '../contexts/FlightData';
import React, { useContext, useEffect, useState } from 'react';





const SEAT_LETTERS = ["A", "B", "C", "D", "E", "F"];

// Initial booked seats matching the reference layout
const bookedPattern = {
    1:["D", "A", "B"],
    3:["D", "A", "B"],
    4:["A", "B"],
    5:["E", "C", "B"],
    6: ["D", "F"],
    7: ["C", "F"],
    8: ["B", "C", "D", "F"],
    9: ["A", "B", "D"],
    10: ["B", "F"],
    11: ["A", "F"],
    12: ["C"],
    13: ["A", "D", "F"],
    14: ["A", "B", "D", "F"],
    15:["E", "A", "B"],
    16:["A", "B"],
    17:["D", "C", "B"],
    18:["D", "E", "B"],
    19:["A", "B"],
    21:["D", "C", "B"],
    22:["E", "A", "B"],
    23:["D", "A", "E"],
    27:["A", "B", "C"]
};

const createEmptyPassenger = () => ({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    emergencyName: "",
    emergencyPhone: ""
});


// Generate 28 rows with 6 seats each
const createSeats = () => {
    return Array.from({ length: 28 }, (_, index) => {
        const rowNumber = index + 1;

        return {
            row: rowNumber,
            seats: Object.fromEntries(
                SEAT_LETTERS.map(letter => [
                    letter,
                    bookedPattern[rowNumber]?.includes(letter)
                        ? "booked"
                        : "avl"
                ])
            )
        };
    });
};

const Ticket = () => {
    const [showBookedModal, setShowBookedModal] = useState(false);

    const {flightData} = useContext(flightDataContext);
    const [seats, setSeats] = useState(createSeats);
    const passengerCount = Math.max(
        1,
        Number(flightData?.passengers) || 2
    );

    const [passengers, setPassengers] = useState(
        () => Array.from({ length: passengerCount }, createEmptyPassenger)
    );

    // Keep passenger state synchronized with passenger count
    useEffect(() => {
        setPassengers(prev =>
            Array.from(
                { length: passengerCount },
                (_, index) => prev[index] || createEmptyPassenger()
            )
        );
    }, [passengerCount]);


    const formatDate = (dateString) => {
        if (!dateString) return "";

        const [year, month, day] = dateString.split("-").map(Number);

        const date = new Date(year, month - 1, day);

        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
        });
    };

    // Handle passenger input changes
    const handlePassengerChange = (index, field, value) => {
        setPassengers(prev =>
            prev.map((passenger, i) =>
                i === index
                    ? { ...passenger, [field]: value }
                    : passenger
            )
        );
    };
    const selectedSeats = seats.flatMap(row =>
        SEAT_LETTERS
            .filter(letter => row.seats[letter] === "sel")
            .map(letter => `${row.row}${letter}`)
    );
    // Handle seat selection
    const handleSelection = (rowNumber, seatLetter) => {
        setSeats(prevSeats => {

            const selectedRow = prevSeats.find(
                row => row.row === rowNumber
            );

            if (!selectedRow) return prevSeats;

            const currentStatus = selectedRow.seats[seatLetter];

            if (currentStatus === "booked") {
                return prevSeats;
            }

            const selectedCount = prevSeats.reduce(
                (total, row) =>
                    total + Object.values(row.seats).filter(
                        status => status === "sel"
                    ).length,
                0
            );

            if (currentStatus === "avl" && selectedCount >= passengerCount) {
                return prevSeats;
            }

            return prevSeats.map(row => {
                if (row.row !== rowNumber) return row;

                return {
                    ...row,
                    seats: {
                        ...row.seats,
                        [seatLetter]: currentStatus === "avl" ? "sel" : "avl"
                    }
                };
            });
        });
    };

    // Get seat colours
    const getSeatStyle = (status) => {

        if (status === "booked") {
            return "bg-[#E9E8FC] cursor-not-allowed";
        }

        if (status === "sel") {
            return "bg-[#ED5D7C] cursor-pointer text-white";
        }

        return "bg-[#423EE1] cursor-pointer";
    };

    // Render individual seat
    const renderSeat = (rowNumber, letter, status) => {

        return (
            <button
                key={letter}
                type="button"
                disabled={status === "booked"}
                onClick={() => handleSelection(rowNumber, letter)}
                aria-label={`Row ${rowNumber}, seat ${letter}, ${status}`}
                className={`
                    w-6 h-9
                    rounded-md
                    flex justify-center items-center
                    transition-colors
                    ${getSeatStyle(status)}
                `}
            >
                {status === "sel" ? "✓" : ""}
            </button>
        );
    };

    return (
        <div className='flex '>
            {/* Booking Success Modal */}
            {showBookedModal && (
                <div className="
                    fixed inset-0
                    z-[100]
                    flex items-center justify-center
                    bg-black/30
                    backdrop-blur-[6px]
                    p-4
                ">

                    {/* Popup Card */}
                    <div className="
                        w-[400px]
                        bg-white
                        rounded-2xl
                        shadow-2xl
                        p-8
                        flex flex-col items-center
                        animate-[popup_0.3s_ease-out]
                    ">

                        {/* Success Icon */}
                        <div className="
                            w-20 h-20
                            rounded-full
                            bg-green-100
                            flex items-center justify-center
                            mb-5
                        ">
                            <span className="text-green-600 text-5xl">
                                ✓
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-2xl font-bold text-gray-800">
                            Ticket booked!
                        </h1>

                        <p className="text-gray-500 text-center mt-3">
                            Your flight booking has been completed successfully.
                            Have a safe journey!
                        </p>

                        {/* Close Button */}
                        <button
                            onClick={() => setShowBookedModal(false)}
                            className="
                                mt-7
                                w-full
                                py-3
                                bg-[#635BEE]
                                text-white
                                rounded-lg
                                font-semibold
                                hover:bg-[#5048D8]
                                transition-all
                            "
                        >
                            Continue
                        </button>

                    </div>

                </div>
            )}
            <div className='leftSide1 w-[50%] flex justify-center'>

                <div className='w-70 h-460 bg-[#C6CAFF] rounded-t-full rounded-b-full pt-20 pb-8 flex flex-col flex-wrap items-center'>

                    {/* Windows */}
                    <div className='windows flex justify-between h-10 w-[50%] mb-4'>
                        <div className='bg-[#D7D8FF] w-[45%]'></div>
                        <div className='bg-[#D7D8FF] w-[45%]'></div>
                    </div>

                    {/* Front of the airplane */}
                    <div className='mt-4 w-[90%] h-30 [clip-path:polygon(15%_0,85%_0,100%_100%,0_100%)] bg-[#D7D8FF] rounded-t-[50%]'>
                    </div>

                    {/* Seat section */}
                    <div className='w-[90%] bg-[#D7D8FF] flex-1 rounded-b-full p-4 min-h-0'>

                        <div className='bg-white p-2 h-full overflow-y-auto scrollbar-hide rounded-b-full'>

                            <div className='flex flex-col gap-3 py-2 rounded-t-[80%]'>

                                {seats.map((row) => (

                                    <React.Fragment key={row.row}>

                                        {/* Exit row indicator */}
                                        {[6, 14].includes(row.row) && (
                                            <div className='flex items-center gap-2 text-sm text-[#8294B9]'>
                                                <span className='border-2 border-[#8294B9] rounded-full w-4 h-4 flex justify-center items-center text-xs font-bold'>
                                                    i
                                                </span>
                                                Exit row
                                            </div>
                                        )}

                                        {/* Actual seat row */}
                                        <div className='flex items-center justify-between gap-1'>

                                            {/* Left seats A B C */}
                                            <div className='flex gap-1'>

                                                {["A", "B", "C"].map(letter => (
                                                    renderSeat(
                                                        row.row,
                                                        letter,
                                                        row.seats[letter]
                                                    )
                                                ))}

                                            </div>

                                            {/* Row number */}
                                            <span className='w-5 text-center text-[#8294B9]'>
                                                {row.row}
                                            </span>

                                            {/* Right seats D E F */}
                                            <div className='flex gap-1'>

                                                {["D", "E", "F"].map(letter => (
                                                    renderSeat(
                                                        row.row,
                                                        letter,
                                                        row.seats[letter]
                                                    )
                                                ))}

                                            </div>

                                        </div>

                                    </React.Fragment>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Right side */}
            <div className='w-[50%]'>
                <h1 className='absolute top-230 w-[50%] z-0 font-extrabold text-7xl text-center text-[#7A82F2]'>
                    Flay Way
                </h1>
                <div className='sticky top-0 h-[100vh] border-l border-l-gray-300 bg-gradient-to-br
                    from-indigo-300/20
                    via-blue-200/10
                    to-purple-300/30
                    backdrop-blur-[6px]'>
                    <div className="head h-20 bg-[#27273F] flex ">
                        <div className='w-[40%] border-r border-gray-600 hover:bg-[#52556F] px-5 justify-between flex items-center'>
                            <div className='flex flex-col'>
                                <p className='font-extrabold text-2xl text-white'>
                                    {!flightData.departure? "Kolkata":flightData.departure}
                                </p>
                                <p className='text-sm text-gray-500'>
                                    From
                                </p>    
                            </div>
                            <div className='font-extrabold text-2xl text-white'>
                                ➜
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-extrabold text-2xl text-white'>
                                    {!flightData.arrival? "Delhi":flightData.arrival}
                                </p>
                                <p className='text-sm text-gray-500'>
                                    To
                                </p>    
                            </div>
                        </div>
                        <div className='w-[30%] border-r border-gray-600 hover:bg-[#52556F] flex flex-col justify-center px-5'>
                            <div className='flex justify-between w-full'>
                                <p className=' text-white text-lg font-light'>
                                    {!flightData.date? "Feb 28" : formatDate(flightData.date)}
                                </p>
                                <p className='text-gray-600'>|</p>
                                <p className=' text-white text-lg font-light'>
                                    7:00AM
                                </p>
                            </div>
                            <div>
                                <p className='text-sm text-gray-500'>
                                    Departing
                                </p>
                            </div>
                        </div>
                        <div className='w-[30%] border-r border-gray-600 hover:bg-[#52556F] flex flex-col justify-center px-5'>
                            <div className='flex justify-between w-full'>
                                <p className=' text-white text-lg font-light'>
                                    {!flightData.date? "Feb 28" : formatDate(flightData.date)}
                                </p>
                                <p className='text-gray-600'>|</p>
                                <p className=' text-white text-lg font-light'>
                                    10:30AM
                                </p>
                            </div>
                            <div>
                                <p className='text-sm text-gray-500'>
                                    Arriving
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='px-5 py-5'>
                        {/* Seat Info */}
                        <div className='flex justify-between w-[60%] mt-2 mb-8'>
                            <div className='flex items-center'>
                                <div className='w-6 h-9 bg-[#E9E8FC] rounded-md mx-2 shadow-md'>
                                </div>
                                <p className='mx-2 text-gray-500 text-sm'>Already Booked</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='w-6 h-9 bg-[#423EE1] rounded-md mx-2 shadow-md'>
                                </div>
                                <p className='mx-2 text-gray-500 text-sm'>Available</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='w-6 h-9 bg-[#ED5D7C] rounded-md mx-2 shadow-md'>
                                </div>
                                <p className='mx-2 text-gray-500 text-sm'>Selected by you</p>
                            </div>
                        </div>
                        {/* Passengers Info */}
                        <div className='h-140 rounded-xl bg-white shadow-lg overflow-y-auto p-5'>

                            {Array.from(
                                { length: Number(flightData.passengers) || 2 },
                                (_, index) => (
                                    <div
                                        key={index}
                                        className='border border-gray-200 rounded-xl p-5 mb-5 hover:shadow-md transition-shadow'
                                    >

                                        {/* Passenger Header */}
                                        <div className='flex items-center justify-between mb-5'>
                                            <div>
                                                <h2 className='text-lg font-bold text-gray-800'>
                                                    Passenger {index + 1}
                                                </h2>
                                                <p className='text-xs text-gray-400'>
                                                    Enter passenger information
                                                </p>
                                            </div>

                                            <span className='bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold'>
                                                Traveller {index + 1}
                                            </span>
                                        </div>

                                        {/* Form Fields */}
                                        <div className='grid grid-cols-2 gap-4'>

                                            {/* Full Name */}
                                            <div className='col-span-2 flex flex-col gap-1'>
                                                <label className='text-sm font-medium text-gray-600'>
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter full name"
                                                    value={passengers[index].name}
                                                    onChange={(e) =>
                                                        handlePassengerChange(index, "name", e.target.value)
                                                    }
                                                    className="w-full h-11 border border-gray-200 rounded-lg px-3"
                                                />
                                            </div>

                                            {/* Age */}
                                            <div className='flex flex-col gap-1'>
                                                <label className='text-sm font-medium text-gray-600'>
                                                    Age *
                                                </label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="120"
                                                    placeholder="Age"
                                                    value={passengers[index].age}
                                                    onChange={(e) =>
                                                        handlePassengerChange(index, "age", e.target.value)
                                                    }
                                                    className="w-full h-11 border border-gray-200 rounded-lg px-3"
                                                />
                                            </div>

                                            {/* Gender */}
                                            <div className='flex flex-col gap-1'>
                                                <label className='text-sm font-medium text-gray-600'>
                                                    Gender *
                                                </label>
                                                <select
                                                    value={passengers[index].gender}
                                                    onChange={(e) =>
                                                        handlePassengerChange(index, "gender", e.target.value)
                                                    }
                                                    className="w-full h-11 border border-gray-200 rounded-lg px-3"
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>

                                            {/* Email */}
                                            <div className='col-span-2 flex flex-col gap-1'>
                                                <label className='text-sm font-medium text-gray-600'>
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    placeholder="Email address"
                                                    value={passengers[index].email}
                                                    onChange={(e) =>
                                                        handlePassengerChange(index, "email", e.target.value)
                                                    }
                                                    className="w-full h-11 border border-gray-200 rounded-lg px-3"
                                                />
                                            </div>

                                            {/* Phone */}
                                            <div className='col-span-2 flex flex-col gap-1'>
                                                <label className='text-sm font-medium text-gray-600'>
                                                    Phone Number *
                                                </label>
                                                <input
                                                    type="tel"
                                                    placeholder="Phone number"
                                                    value={passengers[index].phone}
                                                    onChange={(e) =>
                                                        handlePassengerChange(index, "phone", e.target.value)
                                                    }
                                                    className="w-full h-11 border border-gray-200 rounded-lg px-3"
                                                />
                                            </div>

                                            {/* Emergency Contact */}
                                            <div className='col-span-2 border-t border-gray-100 pt-4 mt-2'>
                                                <h3 className='text-sm font-semibold text-gray-700 mb-3'>
                                                    Emergency Contact
                                                </h3>

                                                <div className='flex flex-col gap-1 mb-3'>
                                                    <label className='text-sm font-medium text-gray-600'>
                                                        Contact Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Emergency contact name"
                                                        value={passengers[index].emergencyName}
                                                        onChange={(e) =>
                                                            handlePassengerChange(index, "emergencyName", e.target.value)
                                                        }
                                                        className="w-full h-11 border border-gray-200 rounded-lg px-3"
                                                    />
                                                </div>

                                                <div className='flex flex-col gap-1'>
                                                    <label className='text-sm font-medium text-gray-600'>
                                                        Emergency Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        placeholder="Emergency contact number"
                                                        value={passengers[index].emergencyPhone}
                                                        onChange={(e) =>
                                                            handlePassengerChange(index, "emergencyPhone", e.target.value)
                                                        }
                                                        className="w-full h-11 border border-gray-200 rounded-lg px-3"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        {/* Dynamic Bottom Booking Bar */}
                        <div className="
                            fixed bottom-0 left-0 w-full
                            h-[120px]
                            bg-white/90
                            backdrop-blur-[5px]
                            border-t border-gray-200
                            shadow-[0_-4px_20px_rgba(0,0,0,0.05)]
                            flex items-center
                            z-50
                        ">

                            {/* Passenger Details */}
                            <div className="flex-1 min-w-0 flex items-center justify-between px-8 gap-6">

                                {/* Dynamic Passenger Information */}
                                <div className="flex items-center gap-8 flex-1 min-w-0 overflow-x-auto">

                                    {passengers.map((passenger, index) => (

                                        <div
                                            key={index}
                                            className="flex items-center gap-8 shrink-0"
                                        >

                                            {/* Passenger Name */}
                                            <div className="flex flex-col gap-1 min-w-[150px]">

                                                <p className="text-gray-400 text-base">
                                                    Passenger {index + 1}
                                                </p>

                                                <h2 className="text-gray-600 text-xl font-medium truncate">
                                                    {passenger.name.trim() || "Not entered"}
                                                </h2>

                                            </div>

                                            {/* Seat Number */}
                                            <div className="flex flex-col gap-1 min-w-[100px]">

                                                <p className="text-gray-400 text-base">
                                                    Seat number
                                                </p>

                                                <h2 className="text-gray-600 text-xl font-medium">
                                                    {selectedSeats[index] || "Not selected"}
                                                </h2>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-4 shrink-0">

                                    <button
                                        type="button"
                                        className="
                                            px-6 py-4
                                            border border-[#635BEE]
                                            text-[#635BEE]
                                            rounded-md text-lg
                                            hover:bg-indigo-50
                                            transition-all
                                        "
                                    >
                                        Save and close
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setShowBookedModal(true)}
                                        className="
                                            px-7 py-4
                                            bg-[#635BEE]
                                            text-white
                                            rounded-md text-lg
                                            hover:bg-[#5048D8]
                                            transition-all
                                            shadow-md
                                        "
                                    >
                                        Confirm booking 
                                    </button>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
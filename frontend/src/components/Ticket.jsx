import { flightDataContext } from '../contexts/FlightData';
import React, { useContext, useEffect, useState } from 'react';





const SEAT_LETTERS = ["A", "B", "C", "D", "E"];

// Initial booked seats matching the reference layout
const bookedPattern = {
    1:["D", "A", "B"],
    3:["D", "A", "B"],
    4:["A", "B"],
    5:["E", "C", "B"],
    6: ["D"],
    7: ["C"],
    8: ["B", "C", "D"],
    9: ["A", "B", "D"],
    10: ["B"],
    11: ["A"],
    12: ["C"],
    13: ["A", "D"],
    14: ["A", "B", "D"],
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

// Seat pricing is based on seat position/category. Most seats are Standard (free).
// These examples follow the assessment's suggested sample data.
const SEAT_PRICE_OVERRIDES = {
    "1C": { category: "Extra Legroom", price: 350 },
    "1E": { category: "Premium", price: 250 },
    "2A": { category: "Extra Legroom", price: 350 }
};

const getSeatPricing = (rowNumber, seatLetter) => {
    const seatId = `${rowNumber}${seatLetter}`;

    // Explicit sample prices from the assessment take priority.
    if (SEAT_PRICE_OVERRIDES[seatId]) {
        return SEAT_PRICE_OVERRIDES[seatId];
    }

    // Exit rows are Extra Legroom seats.
    if ([6, 14].includes(rowNumber)) {
        return { category: "Extra Legroom", price: 15350 };
    }

    // Window seats (A and E) are Premium.
    if (["A", "E"].includes(seatLetter)) {
        return { category: "Premium", price: 12500 };
    }

    // Aisle seats (C and D) have a small additional charge.
    if (["C", "D"].includes(seatLetter)) {
        return { category: "Aisle", price: 10500 };
    }

    // Middle seat B is Standard and free.
    return { category: "Standard", price: 6000 };
};

const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);

// Mock meal menu. Each passenger can choose one option or decline a meal.
const MEAL_OPTIONS = [
    {
        id: "vegetarian",
        name: "Vegetarian Meal",
        description: "A complimentary balanced vegetarian meal.",
        price: 0
    },
    {
        id: "fruit-snack",
        name: "Fruit & Light Snack",
        description: "Seasonal fruit with a light snack.",
        price: 120
    },
    {
        id: "paneer-meal",
        name: "Paneer Meal",
        description: "Paneer curry served with rice and bread.",
        price: 180
    },
    {
        id: "chicken-meal",
        name: "Chicken Meal",
        description: "Chicken curry served with rice and bread.",
        price: 250
    }
];

const createEmptyPassenger = () => ({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    emergencyName: "",
    emergencyPhone: "",
    assignedSeat: null,
    mealRequired: null,
    selectedMeal: ""
});


// Generate 28 rows with 5 seats each
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
    const [selectedPassengerIndex, setSelectedPassengerIndex] = useState(null);
    const [assignmentMessage, setAssignmentMessage] = useState("");

    // Keep passenger records (including their seat assignments) synchronized
    // with the requested passenger count.
    useEffect(() => {
        setPassengers(prev =>
            Array.from(
                { length: passengerCount },
                (_, index) => prev[index] || createEmptyPassenger()
            )
        );
        setSelectedPassengerIndex(current =>
            current === null ? null : Math.min(current, passengerCount - 1)
        );
        setAssignmentMessage("");
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

    // Ask each passenger whether they need a meal before showing the menu.
    const handleMealPreference = (index, mealRequired) => {
        setPassengers(prev =>
            prev.map((passenger, i) =>
                i === index
                    ? {
                        ...passenger,
                        mealRequired,
                        selectedMeal: mealRequired ? passenger.selectedMeal : ""
                    }
                    : passenger
            )
        );
    };

    const handleMealSelection = (index, mealId) => {
        setPassengers(prev =>
            prev.map((passenger, i) =>
                i === index && passenger.mealRequired === true
                    ? { ...passenger, selectedMeal: mealId }
                    : passenger
            )
        );
    };

    const selectedPassenger = selectedPassengerIndex === null
        ? null
        : passengers[selectedPassengerIndex] || null;

    // A passenger's assignedSeat is the source of truth for seat ownership.
    // This keeps assignments stable when passengers are switched.
    const selectedSeatDetails = passengers.map(passenger => {
        if (!passenger.assignedSeat) return null;

        const match = passenger.assignedSeat.match(/^(\d+)([A-E])$/);
        if (!match) return null;

        const rowNumber = Number(match[1]);
        const letter = match[2];

        return {
            row: rowNumber,
            letter,
            seatId: passenger.assignedSeat,
            ...getSeatPricing(rowNumber, letter)
        };
    });

    // Calculate the total from passenger assignments so selecting, changing,
    // or removing a seat updates the total immediately.
    const totalSeatCost = selectedSeatDetails.reduce(
        (total, seat) => total + (seat?.price || 0),
        0
    );

    const selectedMealDetails = passengers.map(passenger => {
        if (passenger.mealRequired !== true || !passenger.selectedMeal) return null;
        return MEAL_OPTIONS.find(meal => meal.id === passenger.selectedMeal) || null;
    });

    const totalMealCost = selectedMealDetails.reduce(
        (total, meal) => total + (meal?.price || 0),
        0
    );
    const totalBookingCost = totalSeatCost + totalMealCost;

    const getSeatStatus = (rowNumber, seatLetter) => {
        const row = seats.find(item => item.row === rowNumber);
        if (!row || row.seats[seatLetter] === "booked") return "booked";

        const seatId = `${rowNumber}${seatLetter}`;
        const assignedPassengerIndex = passengers.findIndex(
            passenger => passenger.assignedSeat === seatId
        );

        if (assignedPassengerIndex === selectedPassengerIndex) return "sel";
        if (assignedPassengerIndex !== -1) return "assigned";

        return "avl";
    };

    // Assign a seat to the active passenger. Choosing another available seat
    // automatically replaces their previous assignment. Clicking their own
    // seat again removes it; seats assigned to other passengers cannot be taken.
    const handleSelection = (rowNumber, seatLetter) => {
        const seatId = `${rowNumber}${seatLetter}`;
        const row = seats.find(item => item.row === rowNumber);

        if (!row || row.seats[seatLetter] === "booked") {
            setAssignmentMessage(`Seat ${seatId} is already occupied.`);
            return;
        }

        const assignedPassengerIndex = passengers.findIndex(
            passenger => passenger.assignedSeat === seatId
        );

        if (assignedPassengerIndex === selectedPassengerIndex) {
            setPassengers(prev =>
                prev.map((passenger, index) =>
                    index === selectedPassengerIndex
                        ? { ...passenger, assignedSeat: null }
                        : passenger
                )
            );
            setAssignmentMessage(`Seat ${seatId} removed from Passenger ${selectedPassengerIndex + 1}.`);
            return;
        }

        if (assignedPassengerIndex !== -1) {
            setAssignmentMessage(
                `Seat ${seatId} is already assigned to Passenger ${assignedPassengerIndex + 1}.`
            );
            return;
        }

        if (!selectedPassenger) {
            setAssignmentMessage("Select a passenger before choosing a seat.");
            return;
        }

        setPassengers(prev =>
            prev.map((passenger, index) =>
                index === selectedPassengerIndex
                    ? { ...passenger, assignedSeat: seatId }
                    : passenger
            )
        );
        setAssignmentMessage(`Seat ${seatId} assigned to Passenger ${selectedPassengerIndex + 1}.`);
    };

    const handleRemoveAssignedSeat = () => {
        if (!selectedPassenger?.assignedSeat) return;

        const removedSeat = selectedPassenger.assignedSeat;
        setPassengers(prev =>
            prev.map((passenger, index) =>
                index === selectedPassengerIndex
                    ? { ...passenger, assignedSeat: null }
                    : passenger
            )
        );
        setAssignmentMessage(`Seat ${removedSeat} removed from Passenger ${selectedPassengerIndex + 1}.`);
    };

    // Get seat colours
    const getSeatStyle = (status) => {
        if (status === "booked") {
            return "bg-[#E9E8FC] cursor-not-allowed text-gray-500";
        }

        if (status === "sel") {
            return "bg-[#ED5D7C] cursor-pointer text-white";
        }

        if (status === "assigned") {
            return "bg-[#8B83F6] cursor-not-allowed text-white";
        }

        return "bg-[#423EE1] cursor-pointer text-white";
    };

    // Render the price inside each seat so it is visible directly on the aircraft diagram.
    const renderSeat = (rowNumber, letter, status) => {
        const { category, price } = getSeatPricing(rowNumber, letter);
        const priceLabel = price === 0 ? "FREE" : `₹${price}`;
        const seatId = `${rowNumber}${letter}`;
        const assignedPassengerIndex = passengers.findIndex(
            passenger => passenger.assignedSeat === seatId
        );
        const ownerLabel = assignedPassengerIndex >= 0
            ? `assigned to Passenger ${assignedPassengerIndex + 1}`
            : status === "booked" ? "already booked" : "available";

        return (
            <button
                key={letter}
                type="button"
                disabled={status === "booked"}
                onClick={() => handleSelection(rowNumber, letter)}
                title={`Seat ${seatId} · ${category} · ${formatCurrency(price)} · ${ownerLabel}`}
                aria-label={`Seat ${seatId}, ${status}, ${category}, ${formatCurrency(price)}, ${ownerLabel}`}
                className={`
                    w-8 h-11
                    rounded-md
                    flex flex-col justify-center items-center gap-1
                    transition-colors
                    ${getSeatStyle(status)}
                `}
            >
                <span className="text-[9px] leading-none font-bold">
                    {status === "sel"
                        ? "✓"
                        : status === "assigned"
                            ? `P${assignedPassengerIndex + 1}`
                            : letter}
                </span>
                <span className="text-[8px] leading-none font-semibold whitespace-nowrap">
                    {priceLabel}
                </span>
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

                        <div className="mt-4 rounded-lg bg-indigo-50 px-5 py-4 w-full">
                            <div className="flex justify-between gap-4 text-sm text-gray-600">
                                <span>Seat charges</span>
                                <span>{formatCurrency(totalSeatCost)}</span>
                            </div>
                            <div className="flex justify-between gap-4 text-sm text-gray-600 mt-2">
                                <span>Meal charges</span>
                                <span>{formatCurrency(totalMealCost)}</span>
                            </div>
                            <div className="flex justify-between items-center gap-4 border-t border-indigo-100 mt-3 pt-3">
                                <span className="font-semibold text-gray-700">Total booking cost</span>
                                <span className="text-xl font-bold text-[#423EE1]">{formatCurrency(totalBookingCost)}</span>
                            </div>
                        </div>

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

                <div className='w-70 h-530 bg-[#C6CAFF] rounded-t-full rounded-b-full pt-20 pb-8 flex flex-col flex-wrap items-center'>

                    {/* Windows */}
                    <div className='windows flex justify-between h-10 w-[50%] mb-4'>
                        <div className='bg-[#D7D8FF] w-[45%]'></div>
                        <div className='bg-[#D7D8FF] w-[45%]'></div>
                    </div>

                    {/* Front of the airplane */}
                    <div className='mt-4 w-[90%] h-30 z-[1] [clip-path:polygon(15%_0,85%_0,100%_100%,0_100%)] bg-[#D7D8FF] rounded-t-[50%]'>
                    </div>

                    {/* Seat section */}
                    <div className='w-[90%] bg-[#D7D8FF] flex-1 rounded-b-full p-4 min-h-0'>

                        <div className='bg-white p-2 h-full overflow-y-auto scrollbar-hide rounded-b-full'>

                            <div className='flex flex-col gap-3 py-2 rounded-t-[80%]'>

                                {/* Column labels follow the 3-seat / aisle / 2-seat layout */}
                                <div className='grid grid-cols-[repeat(3,minmax(0,1fr))_32px_repeat(2,minmax(0,1fr))] items-center px-1 mb-1 text-sm font-bold text-[#27273F]'>
                                    {["A", "B", "C"].map(letter => (
                                        <p key={letter} className='text-center'>{letter}</p>
                                    ))}
                                    <span aria-hidden='true' />
                                    {["D", "E"].map(letter => (
                                        <p key={letter} className='text-center'>{letter}</p>
                                    ))}
                                </div>

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

                                        {/* Three seats, a wider central aisle, then two seats */}
                                        <div className='grid grid-cols-[repeat(3,minmax(0,1fr))_32px_repeat(2,minmax(0,1fr))] items-center px-1'>
                                            {["A", "B", "C"].map(letter => (
                                                <div key={letter} className='flex justify-center'>
                                                    {renderSeat(row.row, letter, getSeatStatus(row.row, letter))}
                                                </div>
                                            ))}

                                            {/* Central aisle */}
                                            <span aria-hidden='true' />

                                            {["D", "E"].map(letter => (
                                                <div key={letter} className='flex justify-center'>
                                                    {renderSeat(row.row, letter, getSeatStatus(row.row, letter))}
                                                </div>
                                            ))}
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
                <div className='sticky top-0 h-300 border-l border-l-gray-300 bg-gradient-to-br
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
                        {/* Seat status legend - responsive layout matching Ticket2 */}
                        <div className="w-full flex flex-wrap items-center gap-x-5 gap-y-3 mt-2 mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-7 bg-[#E9E8FC] rounded-md shadow-sm" />
                                <p className="text-gray-500 text-xs">Booked</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-7 bg-[#423EE1] rounded-md shadow-sm" />
                                <p className="text-gray-500 text-xs">Available</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-7 bg-[#ED5D7C] rounded-md shadow-sm" />
                                <p className="text-gray-500 text-xs">Active passenger</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-7 bg-[#8B83F6] rounded-md shadow-sm" />
                                <p className="text-gray-500 text-xs">Assigned to another passenger</p>
                            </div>
                        </div>

                        {/* Passenger selector for seat assignment */}
                        <div className="mb-5 rounded-xl border border-indigo-100 bg-white/80 p-4">
                            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-800">
                                        Select passenger
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Choose a passenger first, then click an available seat.
                                    </p>
                                </div>
                                {selectedPassenger?.assignedSeat && (
                                    <button
                                        type="button"
                                        onClick={handleRemoveAssignedSeat}
                                        className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline"
                                    >
                                        Remove assigned seat
                                    </button>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {passengers.map((passenger, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => {
                                            setSelectedPassengerIndex(index);
                                            setAssignmentMessage("");
                                        }}
                                        aria-pressed={selectedPassengerIndex === index}
                                        className={`rounded-lg border px-3 py-2 text-left transition-all ${
                                            selectedPassengerIndex === index
                                                ? "border-[#635BEE] bg-indigo-50 text-[#423EE1] ring-2 ring-indigo-100"
                                                : "border-gray-200 bg-white text-gray-600 hover:border-indigo-200"
                                        }`}
                                    >
                                        <span className="block text-xs font-semibold">
                                            {passenger.name.trim() || `Passenger ${index + 1}`}
                                        </span>
                                        <span className="block text-[11px] mt-1">
                                            {passenger.assignedSeat
                                                ? `Seat ${passenger.assignedSeat}`
                                                : "No seat assigned"}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                                <p className="text-xs text-gray-600">
                                    Active: <span className="font-semibold text-[#423EE1]">
                                        {selectedPassenger
                                            ? (selectedPassenger.name.trim() || `Passenger ${selectedPassengerIndex + 1}`)
                                            : "None — select a passenger"}
                                    </span>
                                    {selectedPassenger
                                        ? (selectedPassenger.assignedSeat
                                            ? ` · Seat ${selectedPassenger.assignedSeat}`
                                            : " · Choose a seat")
                                        : " · Select a passenger before choosing a seat"}
                                </p>
                                {assignmentMessage && (
                                    <p role="status" aria-live="polite" className="text-xs text-indigo-600">
                                        {assignmentMessage}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Seat price categories */}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-5 text-xs text-gray-500">
                            <span className="font-semibold text-gray-600">Seat prices:</span>
                            <span>Standard · {formatCurrency(0)}</span>
                            <span>Aisle · {formatCurrency(150)}</span>
                            <span>Premium · {formatCurrency(250)}</span>
                            <span>Extra Legroom · {formatCurrency(350)}</span>
                        </div>
                        
                        {/* Live seat, meal and booking cost summary - matching Ticket2 */}
                        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-indigo-100 bg-indigo-50/70 px-4 py-3 mb-5">
                            <div>
                                <p className="text-sm font-semibold text-gray-700">Selected seats</p>
                                <p className="text-xs text-gray-500">
                                    {selectedSeatDetails.filter(Boolean).length} of {passengerCount} seat(s)
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Meals selected: {selectedMealDetails.filter(Boolean).length}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500">
                                    Seat charges · {formatCurrency(totalSeatCost)}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Meal charges · {formatCurrency(totalMealCost)}
                                </p>
                                <p className="text-sm font-semibold text-gray-700 mt-1">
                                    Total booking cost
                                </p>
                                <p className="text-xl font-bold text-[#635BEE]" aria-live="polite">
                                    {formatCurrency(totalBookingCost)}
                                </p>
                            </div>
                        </div>

                        {/* Passengers Info */}
                        <div className='h-140 rounded-xl bg-white shadow-lg overflow-y-auto p-5'>

                            {passengers.map((passenger, index) => (
                                    <div
                                        key={index}
                                        className='border border-gray-200 rounded-xl p-5 mb-5 hover:shadow-md transition-shadow'
                                    >

                                        {/* Passenger Header */}
                                        <div className='flex items-center justify-between mb-5'>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedPassengerIndex(index);
                                                    setAssignmentMessage("");
                                                }}
                                                className="text-left"
                                            >
                                                <h2 className='text-lg font-bold text-gray-800'>
                                                    Passenger {index + 1}
                                                </h2>
                                                <p className='text-xs text-gray-400'>
                                                    {passenger.assignedSeat
                                                        ? `Assigned seat: ${passenger.assignedSeat}`
                                                        : "No seat assigned"}
                                                </p>
                                            </button>

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

                                        {/* Meal selection: ask first, reveal menu only after Yes */}
                                        <div className="mt-5 border-t border-gray-100 pt-4">
                                            <div className="mb-3">
                                                <h3 className="text-sm font-semibold text-gray-700">
                                                    Meal preference
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Would Passenger {index + 1} like a meal?
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleMealPreference(index, true)}
                                                    aria-pressed={passenger.mealRequired === true}
                                                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                                                        passenger.mealRequired === true
                                                            ? "border-[#635BEE] bg-indigo-50 text-[#423EE1] ring-2 ring-indigo-100"
                                                            : "border-gray-200 bg-white text-gray-600 hover:border-indigo-200"
                                                    }`}
                                                >
                                                    Yes, I need a meal
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleMealPreference(index, false)}
                                                    aria-pressed={passenger.mealRequired === false}
                                                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                                                        passenger.mealRequired === false
                                                            ? "border-[#635BEE] bg-indigo-50 text-[#423EE1] ring-2 ring-indigo-100"
                                                            : "border-gray-200 bg-white text-gray-600 hover:border-indigo-200"
                                                    }`}
                                                >
                                                    No meal, thank you
                                                </button>
                                            </div>

                                            {passenger.mealRequired === true && (
                                                <div className="mt-4">
                                                    <p className="text-xs font-semibold text-gray-600 mb-3">
                                                        Choose one meal option
                                                    </p>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {MEAL_OPTIONS.map(meal => (
                                                            <button
                                                                key={meal.id}
                                                                type="button"
                                                                onClick={() => handleMealSelection(index, meal.id)}
                                                                aria-pressed={passenger.selectedMeal === meal.id}
                                                                className={`rounded-lg border p-3 text-left transition-all ${
                                                                    passenger.selectedMeal === meal.id
                                                                        ? "border-[#635BEE] bg-indigo-50 ring-2 ring-indigo-100"
                                                                        : "border-gray-200 bg-white hover:border-indigo-200"
                                                                }`}
                                                            >
                                                                <span className="flex items-start justify-between gap-2">
                                                                    <span className="text-sm font-semibold text-gray-800">
                                                                        {meal.name}
                                                                    </span>
                                                                    <span className="shrink-0 text-xs font-bold text-[#423EE1]">
                                                                        {meal.price === 0 ? "FREE" : formatCurrency(meal.price)}
                                                                    </span>
                                                                </span>
                                                                <span className="block text-xs text-gray-500 mt-1">
                                                                    {meal.description}
                                                                </span>
                                                                {passenger.selectedMeal === meal.id && (
                                                                    <span className="block text-xs font-semibold text-[#423EE1] mt-2">
                                                                        ✓ Selected
                                                                    </span>
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    {!passenger.selectedMeal && (
                                                        <p className="text-xs text-amber-600 mt-2" role="status">
                                                            Please choose one meal, or select “No meal, thank you”.
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {passenger.mealRequired === false && (
                                                <p className="text-xs text-gray-500 mt-3">
                                                    No meal selected. No meal charges will be added.
                                                </p>
                                            )}
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
                                                <p className="text-gray-400 text-sm">Seat number</p>
                                                <h2 className="text-gray-600 text-lg font-medium">
                                                    {selectedSeatDetails[index]?.seatId || "Not selected"}
                                                </h2>
                                            </div>

                                            {/* Seat Price */}
                                            <div className="flex flex-col gap-1 min-w-[105px]">
                                                <p className="text-gray-400 text-sm">Seat price</p>
                                                <h2 className="text-gray-700 text-lg font-semibold">
                                                    {selectedSeatDetails[index]
                                                        ? formatCurrency(selectedSeatDetails[index].price)
                                                        : "—"}
                                                </h2>
                                                <span className="text-xs text-gray-400">
                                                    {selectedSeatDetails[index]?.category || "No seat"}
                                                </span>
                                            </div>

                                            {/* Selected Meal */}
                                            <div className="flex flex-col gap-1 min-w-[150px]">
                                                <p className="text-gray-400 text-sm">Meal</p>
                                                <h2 className="text-gray-700 text-sm font-semibold">
                                                    {selectedMealDetails[index]?.name || (
                                                        passenger.mealRequired === false
                                                            ? "Not required"
                                                            : passenger.mealRequired === true
                                                                ? "Choose a meal"
                                                                : "Not decided"
                                                    )}
                                                </h2>
                                                <span className="text-xs text-gray-400">
                                                    {selectedMealDetails[index]
                                                        ? formatCurrency(selectedMealDetails[index].price)
                                                        : "No meal charge"}
                                                </span>
                                            </div>

                                        </div>

                                    ))}

                                </div>

                                {/* Total and Action Buttons */}
                                <div className="flex items-center gap-4 shrink-0">
                                    <div className="text-right min-w-[145px]">
                                        <p className="text-sm text-gray-400">Total booking cost</p>
                                        <p className="text-2xl font-bold text-[#423EE1]" aria-live="polite">
                                            {formatCurrency(totalBookingCost)}
                                        </p>
                                        <p className="text-[11px] text-gray-400 whitespace-nowrap">
                                            Seats {formatCurrency(totalSeatCost)} + Meals {formatCurrency(totalMealCost)}
                                        </p>
                                    </div>

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

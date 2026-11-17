import React from 'react'

const Others = () => {

    const flightDeals = [
        {
            image: "image1.png",
            alt: "The Bund in Shanghai",
            place: "The Bund,",
            location: "Shanghai",
            price: "₹46,177",
            description: "Chain's most international city"
        },
        {
            image: "image2.png",
            alt: "Sydney Opera House",
            place: "Sydney Opera House,",
            location: "Sydney",
            price: "₹86,127",
            description: "Take a stroll along the famous harbor"
        },
        {
            image: "image3.png",
            alt: "Kodaiji Temple",
            place: "Kōdaiji Temple,",
            location: "Kyoto",
            price: "₹58,287",
            description: "Step back in time in the Gion district"
        }
    ];

    const stays = [
        {
            image: "image5.png",
            alt: "Maldives atolls",
            place: "Stay among the atolls in",
            location: "Maldives",
            description: "From the 2nd century AD, the islands were known as the 'Money Isles' due to the abundance of cowry shells, a currency of the early ages."
        },
        {
            image: "image6.png",
            alt: "Ourika Valley in Morocco",
            place: "Experience the Ourika Valley in",
            location: "Morocco",
            description: "Morocco’s Hispano-Moorish architecture blends influences from Berber culture, Spain, and contemporary artistic currents in the Middle East."
        },
        {
            image: "image7.png",
            alt: "Traditional Mongolian yurts",
            place: "Live traditionally in",
            location: "Mongolia",
            description: "Traditional Mongolian yurts consists of an angled latticework of wood or bamboo for walls, ribs, and a wheel."
        }
    ];

    const handleImageError = (e) => {
        e.currentTarget.style.visibility = 'hidden';
    };

    return (
        <div className='px-4 sm:px-6 md:px-10 w-full'>

            {/* Flight Deals Heading */}
            <div>
                <h3 className='font-medium text-xl sm:text-2xl my-5 text-[#6E7491]'>
                    Find your next adventure with these flight deals
                </h3>
            </div>


            {/* Flight Deals */}
            <div className='imgBoxes flex flex-col sm:flex-row flex-wrap justify-between gap-5 my-5'>

                {flightDeals.map((flight, index) => (
                    <div
                        key={flight.image}
                        className='box rounded-2xl shadow-lg w-full sm:w-[47%] lg:w-[30%] min-w-0 overflow-hidden'
                    >

                        <img
                            src={flight.image}
                            alt={flight.alt}
                            onError={handleImageError}
                            loading="lazy"
                            className='w-full h-auto object-cover rounded-t-2xl'
                        />

                        <div className='px-4 sm:px-5 md:px-7 py-3'>

                            <div className='flex flex-wrap justify-between items-center gap-2'>

                                <div className='flex flex-wrap text-base sm:text-lg min-w-0'>
                                    <p className='text-gray-700 font-md'>
                                        {flight.place}
                                    </p>

                                    <p className='text-[#605DEC] font-bold pl-2'>
                                        {flight.location}
                                    </p>
                                </div>

                                <p className='text-base sm:text-lg text-gray-600 whitespace-nowrap'>
                                    {flight.price}
                                </p>

                            </div>

                            <p className='text-sm text-gray-500 mt-1'>
                                {flight.description}
                            </p>

                        </div>

                    </div>
                ))}

            </div>


            {/* Kenya National Park */}
            <div className='box rounded-2xl shadow-lg my-5 mb-10 pb-3 overflow-hidden'>

                <img
                    src="image4.png"
                    alt="Tsavo East National Park in Kenya"
                    onError={handleImageError}
                    loading="lazy"
                    className='w-full h-auto object-cover rounded-t-2xl'
                />

                <div className='px-4 sm:px-5 md:px-7 py-3'>

                    <div className='flex flex-wrap justify-between items-center gap-2'>

                        <div className='flex flex-wrap text-base sm:text-lg'>
                            <p className='text-gray-700 font-md'>
                                Tsavo East National Park,
                            </p>

                            <p className='text-[#605DEC] font-bold pl-2'>
                                Kenya
                            </p>
                        </div>

                        <p className='text-base sm:text-lg text-gray-600 whitespace-nowrap'>
                            ₹106,177
                        </p>

                    </div>

                    <p className='text-sm text-gray-500 mt-1'>
                        Named after the Tsavo River, and opened in April 1984, Tsavo East National Park is one of the oldest parks in Kenya. It is located in the semi-arid Taru Desert.
                    </p>

                </div>

            </div>


            {/* Unique Places Heading */}
            <div className='text-2xl sm:text-3xl font-bold flex flex-wrap mt-12 sm:mt-20'>

                <h2 className='text-gray-500'>
                    Explore unique
                </h2>

                <h2 className='text-[#35C9AE] pl-2'>
                    places to stay
                </h2>

            </div>


            {/* Unique Stays */}
            <div className='imgBoxes flex flex-col sm:flex-row justify-between gap-5 flex-wrap my-5'>

                {stays.map((stay) => (

                    <div
                        key={stay.image}
                        className='box rounded-2xl shadow-lg w-full sm:w-[47%] lg:w-[30%] min-w-0 overflow-hidden'
                    >

                        <img
                            src={stay.image}
                            alt={stay.alt}
                            onError={handleImageError}
                            loading="lazy"
                            className='w-full h-auto object-cover rounded-t-2xl'
                        />

                        <div className='px-4 sm:px-5 md:px-7 py-3'>

                            <div className='flex flex-wrap text-base sm:text-lg'>

                                <p className='text-gray-700 font-md'>
                                    {stay.place}
                                </p>

                                <p className='text-[#35C9AE] font-bold pl-2'>
                                    {stay.location}
                                </p>

                            </div>

                            <p className='text-sm text-gray-500 mt-1'>
                                {stay.description}
                            </p>

                        </div>

                    </div>

                ))}

            </div>


            {/* Explore More Button */}
            <div className='my-12 sm:my-20 h-12 flex justify-center text-base sm:text-xl'>

                <button
                    type='button'
                    className='px-5 h-full bg-[#605DEC] rounded-md text-[#ffffff] hover:bg-[#2e2bc8] transition-colors duration-200'
                >
                    Explore more stays
                </button>

            </div>

        </div>
    )
}

export default Others

import React from 'react'

const Others = () => {
    return (
        <div className=' px-10'>
            <div className=''>
                <h3 className='font-medium text-2xl my-5 text-[#6E7491] '>
                    Find your next adventure with these flight deals
                </h3>
            </div>
            <div className='imgBoxes flex flex-row justify-between my-5'>
                {/* box1 */}
                <div className='box rounded-2xl shadow-lg w-[30%] h-125'>
                    <img src="image1.png" alt="image1" className='w-full rounded-t-2xl' />
                    <div className='px-7 py-3'>
                        <div className='flex justify-between'>
                            <div className='flex text-lg'>
                                <p className='text-gray-700 font-md'>The Bund, </p>
                                <p className='text-[#605DEC] font-bold pl-2'>Shanghai</p>
                            </div>
                            <p className='text-lg text-gray-600'>₹46,177</p>
                        </div>
                        <p className='text-sm text-gray-500'>Chain's most international city</p>
                    </div>
                </div>
                {/* box2 */}
                <div className='box rounded-2xl shadow-lg w-[30%] h-125'>
                    <img src="image2.png" alt="image1" className='w-full rounded-t-2xl' />
                    <div className='px-7 py-3'>
                        <div className='flex justify-between'>
                            <div className='flex text-lg'>
                                <p className='text-gray-700 font-md'>Sydney Opera House, </p>
                                <p className='text-[#605DEC] font-bold pl-2'>Sydney</p>
                            </div>
                            <p className='text-lg text-gray-600'>₹86,127</p>
                        </div>
                        <p className='text-sm text-gray-500'>Take a stroll along the famous harbor</p>
                    </div>
                </div>{/* box3 */}
                <div className='box rounded-2xl shadow-lg w-[30%] h-125'>
                    <img src="image3.png" alt="image1" className='w-full rounded-t-2xl' />
                    <div className='px-7 py-3'>
                        <div className='flex justify-between'>
                            <div className='flex text-lg'>
                                <p className='text-gray-700 font-md'>Kōdaiji Temple, </p>
                                <p className='text-[#605DEC] font-bold pl-2'>Kyoto</p>
                            </div>
                            <p className='text-lg text-gray-600'>₹58,287</p>
                        </div>
                        <p className='text-sm text-gray-500'>Step back in time in the Gion district</p>
                    </div>
                </div>
            </div>
            


            <div className='box rounded-2xl shadow-lg my-5 mb-10 pb-3'>
                    <img src="image4.png" alt="image1" className='w-full rounded-t-2xl' />
                    <div className='px-7 py-3'>
                        <div className='flex justify-between'>
                            <div className='flex text-lg'>
                                <p className='text-gray-700 font-md'>Tsavo East National Park, </p>
                                <p className='text-[#605DEC] font-bold pl-2'>Kenya</p>
                            </div>
                            <p className='text-lg text-gray-600'>₹106,177</p>
                        </div>
                        <p className='text-sm text-gray-500'>Named after the Tsavo River, and opened in April 1984, Tsavo East National Park is one of the oldest parks in Kenya. It is located in the semi-arid Taru Desert.</p>
                    </div>
            </div>


            <div className='text-3xl font-bold flex mt-20'>
                <h2 className='text-gray-500'>
                    Explore unique 
                </h2>
                <h2 className='text-[#35C9AE] pl-2'>places to stay</h2>
            </div>

            <div className='imgBoxes flex flex-row justify-between my-5 flex-wrap'>
                {/* box1 */}
                <div className='box rounded-2xl shadow-lg w-[30%]'>
                    <img src="image5.png" alt="image1" className='w-full rounded-t-2xl' />
                    <div className='px-7 py-3'>
                        <div className='flex justify-between'>
                            <div className='flex text-lg'>
                                <p className='text-gray-700 font-md'>Stay among the atolls in </p>
                                <p className='text-[#35C9AE] font-bold pl-2'>Maldives</p>
                            </div>
                        </div>
                        <p className='text-sm text-gray-500'>From the 2nd century AD, the islands were known as the 'Money Isles' due to the abundance of cowry shells, a currency of the early ages.</p>
                    </div>
                </div>
                {/* box2 */}
                <div className='box rounded-2xl shadow-lg w-[30%]'>
                    <img src="image6.png" alt="image1" className='w-full rounded-t-2xl' />
                    <div className='px-7 py-3'>
                        <div className='flex justify-between'>
                            <div className='flex text-lg'>
                                <p className='text-gray-700 font-md'>Experience the Ourika Valley in </p>
                                <p className='text-[#35C9AE] font-bold pl-2'>Morocco</p>
                            </div>
                        </div>
                        <p className='text-sm text-gray-500'>Morocco’s Hispano-Moorish architecture blends influences from Berber culture, Spain, and contemporary artistic currents in the Middle East.</p>
                    </div>
                </div>{/* box3 */}
                <div className='box rounded-2xl shadow-lg w-[30%]'>
                    <img src="image7.png" alt="image1" className='w-full rounded-t-2xl' />
                    <div className='px-7 py-3'>
                        <div className='flex justify-between'>
                            <div className='flex text-lg'>
                                <p className='text-gray-700 font-md'>Live traditionally in </p>
                                <p className='text-[#35C9AE] font-bold pl-2'>Mongolia</p>
                            </div>
                        </div>
                        <p className='text-sm text-gray-500'>Traditional Mongolian yurts consists of an angled latticework of wood or bamboo for walls, ribs, and a wheel.</p>
                    </div>
                </div>
            </div>


            <div className='my-20 h-12 flex justify-center text-xl'>
                <button type='submit' className='px-5 h-full bg-[#605DEC] rounded-md text-[#ffffff] hover:bg-[#2e2bc8]'>Explore more stays</button>
            </div>


        </div>
    )
}

export default Others

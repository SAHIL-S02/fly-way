import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faInstagram,
    faXTwitter,
    faSquareFacebook
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div className='footerMainBox pt-12 sm:pt-16 lg:pt-20 pb-5 w-full overflow-hidden'>

            {/* Main Footer Content */}
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5
            gap-x-5 sm:gap-x-8 gap-y-8
            px-5 sm:px-8 md:px-12 lg:px-20'>

                {/* Logo */}
                <div className='logo col-span-2 sm:col-span-1 min-w-0'>
                    <h1 className='font-extrabold text-3xl text-[#605DEC]'>
                        Fly Way
                    </h1>
                </div>


                {/* About */}
                <div className='about flex flex-col min-w-0'>
                    <h4 className='text-lg font-bold text-black'>
                        About
                    </h4>
                    <p>About Fly Way</p>
                    <p>How it works</p>
                    <p>Careers</p>
                    <p>Press</p>
                    <p>Blog</p>
                    <p>Forum</p>
                </div>


                {/* Partner with us */}
                <div className='min-w-0'>
                    <h4 className='text-lg font-bold text-black'>
                        Partner with us
                    </h4>
                    <p>Partnership programs</p>
                    <p>Affiliate program</p>
                    <p>Connectivity partners</p>
                    <p>Promotions and events</p>
                    <p>Integrations</p>
                    <p>Community</p>
                    <p>Loyalty program</p>
                </div>


                {/* Support */}
                <div className='min-w-0'>
                    <h4 className='text-lg font-bold text-black'>
                        Support
                    </h4>
                    <p>Help Center</p>
                    <p>Contact us</p>
                    <p>Privacy policy</p>
                    <p>Terms of service</p>
                    <p>Trust and safety</p>
                    <p>Accessibility</p>
                </div>


                {/* Get the app */}
                <div className='min-w-0'>
                    <h4 className='text-lg font-bold text-black'>
                        Get the app
                    </h4>
                    <p>Tripma for Android</p>
                    <p>Tripma for iOS</p>
                    <p>Mobile site</p>

                    <div className='flex flex-col items-start gap-2 mt-2'>
                        <img
                            src="/app store.png"
                            alt="App Store"
                            loading="lazy"
                            className='max-w-full h-auto object-contain'
                        />

                        <img
                            src="/google play.png"
                            alt="Google Play"
                            loading="lazy"
                            className='max-w-full h-auto object-contain'
                        />
                    </div>
                </div>

            </div>


            {/* Divider */}
            <hr className='my-8 sm:my-10 border border-gray-500' />


            {/* Bottom Footer */}
            <div className='px-5 sm:px-8 md:px-12 lg:px-20
            flex flex-col-reverse sm:flex-row
            justify-between items-center
            gap-4 sm:gap-2'>

                {/* Social Media Icons */}
                <div className='flex items-center justify-center'>

                    <FontAwesomeIcon
                        icon={faInstagram}
                        aria-label="Instagram"
                        className="cursor-pointer text-2xl px-2 text-[#5b5b5e] hover:text-[#030303]"
                    />

                    <FontAwesomeIcon
                        icon={faXTwitter}
                        aria-label="X Twitter"
                        className="cursor-pointer text-2xl px-2 text-[#5b5b5e] hover:text-[#030303]"
                    />

                    <FontAwesomeIcon
                        icon={faSquareFacebook}
                        aria-label="Facebook"
                        className="cursor-pointer text-2xl px-2 text-[#5b5b5e] hover:text-[#030303]"
                    />

                </div>


                {/* Copyright */}
                <div className='text-center sm:text-right'>
                    <h4 className='text-md text-gray-500 font-mono'>
                        © 2026 Fly Way incorporated
                    </h4>
                </div>

            </div>

        </div>
    )
}

export default Footer
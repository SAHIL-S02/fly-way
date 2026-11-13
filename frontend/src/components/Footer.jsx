import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
    return (
        <div className='footerMainBox pt-20 pb-5 '>
            <div className='flex justify-between px-20'>
                <div className='logo '>
                    <h1 className='font-extrabold text-3xl text-[#605DEC]'>
                        Fly Way
                    </h1>
                </div>
                <div className='about flex flex-col '>
                    <h4 className='text-lg font-bold text-black'>
                        About
                    </h4>
                    <p>
                        About Fly Way
                    </p>
                    <p>
                        How it works
                    </p>
                    <p>
                        Careers
                    </p>
                    <p>
                        Press
                    </p>
                    <p>
                        Blog
                    </p>
                    <p>
                        Forum
                    </p>
                </div>
                <div >
                    <h4 className='text-lg font-bold text-black'>Partner with us</h4>
                    <p>Partnership programs</p>
                    <p>Affiliate program</p>
                    <p>Connectivity partners</p>
                    <p>Promotions and events</p>
                    <p>Integrations</p>
                    <p>Community</p>
                    <p>Loyalty program</p>
                </div>
                <div>
                    <h4 className='text-lg font-bold text-black'>Support</h4>
                    <p>Help Center</p>
                    <p>Contact us</p>
                    <p>Privacy policy</p>
                    <p>Terms of service</p>
                    <p>Trust and safety</p>
                    <p>Accessibility</p>
                </div>
                <div>
                    <h4 className='text-lg font-bold text-black'>
                        Get the app
                    </h4>
                    <p>Tripma for Android</p>
                    <p>Tripma for iOS</p>
                    <p>Mobile site</p>
                    <img src="/app store.png" alt="appstore" />
                    <img src="/google play.png" alt="playstore" />
                </div>
            </div>

            <hr className='my-10 border border-gray-500'/>
            <div className='px-20 flex justify-between items-center'>
                <div>
                    <FontAwesomeIcon
                        icon={faInstagram}
                        className="cursor-pointer text-2xl px-2 text-[#5b5b5e] hover:text-[#030303]"
                    />
                    <FontAwesomeIcon
                        icon={faXTwitter}
                        className="cursor-pointer text-2xl px-2 text-[#5b5b5e] hover:text-[#030303]"
                    />
                    <FontAwesomeIcon
                        icon={faSquareFacebook}
                        className="cursor-pointer text-2xl px-2 text-[#5b5b5e] hover:text-[#030303]"
                    />
                </div>
                <div>
                    <h4 className='text-md text-gray-500 font-mono'>
                        © 2026 Fly Way incorporated
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default Footer

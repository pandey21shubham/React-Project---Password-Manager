import React from 'react'
import { useState } from 'react'

const Navbar = () => {
    const [showSidebar, setshowSidebar] = useState(false)



  return (
    <nav className="bg-purple-200 ">
        
        {/* Navbar content */}
        
        <div className="mycontainer p-4 flex justify-between items-center">
            
            {/* Hamburger menu */}
            
            <div onClick={()=>{setshowSidebar(true)}} className="hamburger sm:hidden cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(88,28,135,0.8)]">
                <img width={30} src="/icons/hamburger.svg" alt="hamburger" />
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-64
                bg-purple-950 text-white z-50
                transform transition-transform duration-300
                ${showSidebar
                    ? "translate-x-0"
                    : "-translate-x-full"
                }`}
            >
                <div className="logo font-extrabold text-white text-2xl p-4 mt-1">
                    <span className="text-green-500">&lt;</span>
                        Pass
                    <span className="text-green-500">OP/&gt;</span>
                </div>

                {/* close button */}
                <button
                    className="absolute cursor-pointer top-4 right-4 text-white text-2xl font-bold focus:outline-none hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                    onClick={() => setshowSidebar(false)}
                >
                    ✕
                </button>

                {/* sidebar content */}

                    <ul className='mx-auto p-5'>
                        <li className="flex flex-col gap-4">
                            <a href="/" className="text-amber-100 font-semibold text-lg hover:text-yellow-50 hover:font-bold ">Home</a>
                            <a href="/" className="text-amber-100 font-semibold text-lg hover:text-yellow-50 hover:font-bold ">About</a>
                            <a href="/" className="text-amber-100 font-semibold text-lg hover:text-yellow-50 hover:font-bold ">Contact</a>
                        </li>
                    </ul>

            </div>

            {/* Logo */}

            <div className="logo font-extrabold text-purple-600 text-2xl">
                <span className="text-green-500">&lt;</span>
                    Pass
                <span className="text-green-500">OP/&gt;</span>
            </div>
    
            {/* Navigation Links */}    
            
            <div className='flex items-center gap-5'>
                <ul className='hidden sm:block'>
                    <li className="flex gap-4">
                        <a href="/" className="text-purple-900 font-semibold text-lg hover:text-purple-700 hover:font-bold ">Home</a>
                        <a href="/" className="text-purple-900 font-semibold text-lg hover:text-purple-700 hover:font-bold ">About</a>
                        <a href="/" className="text-purple-900 font-semibold text-lg hover:text-purple-700 hover:font-bold ">Contact</a>
                    </li>
                </ul>

                {/* Github icon */}

                <button className='cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.45)]'>
                    <img width={30} src="/icons/github.svg" alt="github" />
                </button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar

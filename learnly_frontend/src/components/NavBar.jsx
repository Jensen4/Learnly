import React, { useState } from 'react'
import { MdHome, MdDescription, MdQuiz, MdSettings, MdLogout } from 'react-icons/md'
import '../index.css'

export default function NavBar() {
    const [activeButton, setActiveButton] = useState('Home')

    const buttons = [
        { name: 'Home', icon: MdHome },
        { name: 'Notes', icon: MdDescription },
        { name: 'Quizzes', icon: MdQuiz },
    ]

    return (
        <div className="fixed w-80 h-full bg-gray-900 border-r border-gray-700 shadow-2xl flex flex-col">
            {/* Logo Section */}
            <div className="p-8 border-b border-gray-700">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Learnly
                </h1>
                <p className="text-sm text-gray-400 mt-1">Your Learning Companion</p>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 px-6 py-8">
                <nav className="space-y-2">
                    {buttons.map((button) => {
                        const IconComponent = button.icon;
                        return (
                            <button 
                                key={button.name} 
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                                    activeButton === button.name 
                                        ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-300 border border-blue-700' 
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                                }`} 
                                onClick={() => setActiveButton(button.name)}
                            >
                                <IconComponent className={`text-xl transition-colors duration-300 ${
                                    activeButton === button.name ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'
                                }`} />
                                <span className="font-medium">{button.name}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* User Section */}
            <div className="p-6 border-t border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">U</span>
                    </div>
                    <div>
                        <p className="font-medium text-gray-200">User</p>
                        <p className="text-sm text-gray-400">Student</p>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors duration-300">
                        <MdSettings className="text-lg" />
                        <span className="text-sm">Settings</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors duration-300">
                        <MdLogout className="text-lg" />
                        <span className="text-sm">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
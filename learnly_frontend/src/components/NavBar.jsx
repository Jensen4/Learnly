import React, { useState } from 'react'
import '../index.css'

export default function NavBar() {
    const [activeButton, setActiveButton] = useState('Home')

    const buttons = [
        { name: 'Home' },
        { name: 'Notes' },
        { name: 'Quizzes' },
    ]

    return (
        <div className="fixed w-[300px] h-full text-zinc-900 flex flex-col items-center justify-start bg-zinc-300">
            <h1 className="text-2xl font-bold p-8">Learnly</h1>
            {buttons.map((button) => (
                <button 
                    key={button.name} 
                    className={`w-full p-4 rounded-md active:scale-95 transition-all duration-300 ${activeButton === button.name ? 'bg-zinc-500' : 'bg-zinc-300 hover:bg-zinc-400'}`} 
                    onClick={() => setActiveButton(button.name)}
                >
                    {button.name}
                </button>
            ))}
        </div>
    )

}
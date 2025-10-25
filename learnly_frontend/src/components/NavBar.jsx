import React, { useState } from 'react'
import '../index.css'

export default function NavBar() {

    const buttons = [
        { name: 'Home', active: true, onClick: () => { setIsActive('Home') } },
        { name: 'Notes', active: false, onClick: () => { setIsActive('Notes') } },
        { name: 'Quizzes', active: false, onClick: () => { setIsActive('Quizzes') } },
    ]

    return (
        <div className="fixed w-[300px] h-full text-zinc-900 flex flex-col items-center justify-start bg-zinc-300">
            <h1 className="text-2xl font-bold p-8">Learnly</h1>
            {buttons.map((button) => (
                <button key={button.name} className={`w-full p-4 rounded-md active:scale-95 transition-all duration-300 ${button.active ? 'bg-zinc-500' : 'bg-zinc-300 hover:bg-zinc-400'}`} onClick={button.onClick}>
                    {button.name}
                </button>
            ))}
        </div>
    )

}
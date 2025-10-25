import { useState } from 'react'
import { MdQuiz, MdDescription, MdSettings, MdPlayArrow, MdRefresh, MdCheckCircle } from "react-icons/md";

export default function QuizGenerator() {
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [quizSettings, setQuizSettings] = useState({
        questionCount: 10,
        difficulty: 'medium',
        questionTypes: ['multiple-choice', 'true-false', 'short-answer']
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [quizGenerated, setQuizGenerated] = useState(false);

    // Mock data for available notes
    const availableNotes = [
        { id: 1, title: "Introduction to React", type: "notes", date: "2024-01-15" },
        { id: 2, title: "JavaScript Fundamentals", type: "notes", date: "2024-01-12" },
        { id: 3, title: "CSS Grid Layout", type: "notes", date: "2024-01-10" },
        { id: 4, title: "Data Structures Lecture", type: "lecture", date: "2024-01-08" },
        { id: 5, title: "Algorithm Analysis", type: "readings", date: "2024-01-05" },
        { id: 6, title: "Database Design", type: "notes", date: "2024-01-03" },
    ];

    function handleNoteToggle(note) {
        setSelectedNotes(prev => 
            prev.find(n => n.id === note.id) 
                ? prev.filter(n => n.id !== note.id)
                : [...prev, note]
        );
    }

    function handleGenerateQuiz() {
        if (selectedNotes.length === 0) return;
        
        setIsGenerating(true);
        // Simulate API call
        setTimeout(() => {
            setIsGenerating(false);
            setQuizGenerated(true);
            console.log("Generating quiz from notes:", selectedNotes);
            console.log("Quiz settings:", quizSettings);
        }, 2000);
    }

    function handleStartQuiz() {
        console.log("Starting quiz...");
        // Navigate to quiz taking interface
    }

    function handleReset() {
        setSelectedNotes([]);
        setQuizGenerated(false);
        setIsGenerating(false);
    }

    return (
        <div className='min-h-screen bg-gray-900 pl-80'>
            <div className='container mx-auto px-8 py-12'>
                {/* Header Section */}
                <div className='text-center mb-12'>
                    <h1 className='text-5xl font-bold text-white mb-4'>
                        Create Your Quiz
                    </h1>
                    <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
                        Select your notes and customize quiz settings to generate personalized practice questions
                    </p>
                </div>

                {/* Main Content */}
                <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    {/* Left Column - Note Selection */}
                    <div className='space-y-6'>
                        <div className='bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700'>
                            <div className='flex items-center space-x-3 mb-6'>
                                <MdDescription className="text-3xl text-blue-400" />
                                <h2 className='text-2xl font-bold text-white'>Select Notes</h2>
                            </div>
                            
                            <div className='space-y-3 max-h-96 overflow-y-auto'>
                                {availableNotes.map((note) => (
                                    <div
                                        key={note.id}
                                        onClick={() => handleNoteToggle(note)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                            selectedNotes.find(n => n.id === note.id)
                                                ? 'border-blue-400 bg-blue-900/30'
                                                : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50'
                                        }`}
                                    >
                                        <div className='flex items-center justify-between'>
                                            <div className='flex-1'>
                                                <h3 className='text-lg font-semibold text-white mb-1'>
                                                    {note.title}
                                                </h3>
                                                <div className='flex items-center space-x-4 text-sm text-gray-400'>
                                                    <span className='capitalize'>{note.type}</span>
                                                    <span>•</span>
                                                    <span>{note.date}</span>
                                                </div>
                                            </div>
                                            {selectedNotes.find(n => n.id === note.id) && (
                                                <MdCheckCircle className="text-2xl text-blue-400" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className='mt-6 pt-4 border-t border-gray-700'>
                                <p className='text-sm text-gray-400'>
                                    {selectedNotes.length} note{selectedNotes.length !== 1 ? 's' : ''} selected
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Quiz Settings */}
                    <div className='space-y-6'>
                        <div className='bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700'>
                            <div className='flex items-center space-x-3 mb-6'>
                                <MdSettings className="text-3xl text-purple-400" />
                                <h2 className='text-2xl font-bold text-white'>Quiz Settings</h2>
                            </div>

                            <div className='space-y-6'>
                                {/* Question Count */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-300 mb-3'>
                                        Number of Questions
                                    </label>
                                    <div className='grid grid-cols-3 gap-3'>
                                        {[5, 10, 20].map((count) => (
                                            <button
                                                key={count}
                                                onClick={() => setQuizSettings(prev => ({ ...prev, questionCount: count }))}
                                                className={`p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                                                    quizSettings.questionCount === count
                                                        ? 'border-blue-400 bg-blue-900/30 text-blue-300'
                                                        : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50 text-gray-300'
                                                }`}
                                            >
                                                {count}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Difficulty Level */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-300 mb-3'>
                                        Difficulty Level
                                    </label>
                                    <div className='grid grid-cols-3 gap-3'>
                                        {[
                                            { value: 'easy', label: 'Easy' },
                                            { value: 'medium', label: 'Medium' },
                                            { value: 'hard', label: 'Hard' }
                                        ].map((difficulty) => (
                                            <button
                                                key={difficulty.value}
                                                onClick={() => setQuizSettings(prev => ({ ...prev, difficulty: difficulty.value }))}
                                                className={`p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                                                    quizSettings.difficulty === difficulty.value
                                                        ? 'border-blue-400 bg-blue-900/30 text-blue-300'
                                                        : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50 text-gray-300'
                                                }`}
                                            >
                                                {difficulty.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Question Types */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-300 mb-3'>
                                        Question Types
                                    </label>
                                    <div className='space-y-3'>
                                        {[
                                            { value: 'multiple-choice', label: 'Multiple Choice' },
                                            { value: 'true-false', label: 'True/False' },
                                            { value: 'short-answer', label: 'Short Answer' }
                                        ].map((type) => (
                                            <label key={type.value} className='flex items-center space-x-3 cursor-pointer '>
                                                <input
                                                    type="checkbox"
                                                    checked={quizSettings.questionTypes.includes(type.value)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setQuizSettings(prev => ({
                                                                ...prev,
                                                                questionTypes: [...prev.questionTypes, type.value]
                                                            }));
                                                        } else {
                                                            setQuizSettings(prev => ({
                                                                ...prev,
                                                                questionTypes: prev.questionTypes.filter(t => t !== type.value)
                                                            }));
                                                        }
                                                    }}
                                                    className='w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-0 focus:outline-none cursor-pointer'
                                                />
                                                <span className='text-gray-300'>{type.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700'>
                            <div className='space-y-4'>
                                {!quizGenerated ? (
                                        <button
                                            onClick={handleGenerateQuiz}
                                            disabled={selectedNotes.length === 0 || isGenerating}
                                            className={`w-full flex items-center justify-center space-x-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                                                selectedNotes.length > 0 && !isGenerating
                                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg cursor-pointer'
                                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                            }`}
                                        >
                                        {isGenerating ? (
                                            <>
                                                <MdRefresh className="animate-spin text-xl" />
                                                <span>Generating Quiz...</span>
                                            </>
                                        ) : (
                                            <>
                                                <MdQuiz className="text-xl" />
                                                <span>Generate Quiz</span>
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <div className='space-y-4'>
                                        <div className='text-center p-6 bg-green-900/20 border border-green-700 rounded-xl'>
                                            <MdCheckCircle className="text-4xl text-green-400 mx-auto mb-2" />
                                            <h3 className='text-lg font-semibold text-green-300 mb-1'>
                                                Quiz Generated Successfully!
                                            </h3>
                                            <p className='text-sm text-gray-400'>
                                                Your quiz is ready with {quizSettings.questionCount} questions
                                            </p>
                                        </div>
                                        
                                        <div className='flex space-x-3'>
                                            <button
                                                onClick={handleStartQuiz}
                                                className='flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 cursor-pointer'
                                            >
                                                <MdPlayArrow className="text-lg" />
                                                <span>Start Quiz</span>
                                            </button>
                                            
                                            <button
                                                onClick={handleReset}
                                                className='px-6 py-3 bg-gray-600 text-gray-300 rounded-xl font-semibold hover:bg-gray-500 transition-colors duration-300 cursor-pointer'
                                            >
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

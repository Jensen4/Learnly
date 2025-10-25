import { useState } from 'react'
import { MdFileUpload, MdCloudUpload, MdDescription, MdVideoLibrary, MdMenuBook } from "react-icons/md";

export default function Home() {
    const [fileType, setFileType] = useState("notes");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);

    function handleUpload(event) {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            console.log("File uploaded:", file.name);
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
        setIsDragOver(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setIsDragOver(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        setIsDragOver(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            console.log("File dropped:", file.name);
        }
    }

    function handleSubmit() {
        if (selectedFile) {
            console.log("Submitting file:", selectedFile.name, "Type:", fileType);
            // Reset form
            setSelectedFile(null);
            setFileType("notes");
        }
    }

    const fileTypeOptions = [
        { value: "notes", label: "Notes", icon: MdDescription },
        { value: "lecture", label: "Lecture", icon: MdVideoLibrary },
        { value: "readings", label: "Readings", icon: MdMenuBook },
    ];

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 pl-80'>
            <div className='container mx-auto px-8 py-12'>
                {/* Header Section */}
                <div className='text-center mb-12'>
                    <h1 className='text-5xl font-bold text-white mb-4'>
                        Welcome to <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>Learnly</span>
                    </h1>
                    <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
                        Upload your learning materials and transform them into interactive study content
                    </p>
                </div>

                {/* Main Upload Section */}
                <div className='max-w-4xl mx-auto'>
                    <div className='bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700'>
                        {/* File Upload Area */}
                        <div className='mb-8'>
                            <label 
                                htmlFor="fileUpload" 
                                className={`cursor-pointer block w-full h-64 border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center space-y-6 ${
                                    isDragOver 
                                        ? 'border-blue-400 bg-blue-900/30 scale-105' 
                                        : selectedFile 
                                            ? 'border-green-400 bg-green-900/20' 
                                            : 'border-gray-600 hover:border-blue-400 hover:bg-gray-700/50'
                                }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                {selectedFile ? (
                                    <>
                                        <MdCloudUpload className="text-6xl text-green-400" />
                                        <div className='text-center'>
                                            <p className='text-2xl font-semibold text-green-300 mb-2'>
                                                {selectedFile.name}
                                            </p>
                                            <p className='text-gray-400'>
                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <MdFileUpload className={`text-6xl transition-colors duration-300 ${
                                            isDragOver ? 'text-blue-400' : 'text-gray-500'
                                        }`} />
                                        <div className='text-center'>
                                            <p className={`text-2xl font-semibold transition-colors duration-300 ${
                                                isDragOver ? 'text-blue-300' : 'text-gray-300'
                                            }`}>
                                                {isDragOver ? 'Drop your file here' : 'Drag & drop your file here'}
                                            </p>
                                            <p className='text-gray-500 mt-2'>
                                                or click to browse files
                                            </p>
                                        </div>
                                    </>
                                )}
                            </label>
                            <input 
                                id="fileUpload" 
                                type="file" 
                                onChange={handleUpload} 
                                className='hidden' 
                                accept=".pdf,.doc,.docx,.txt,.mp4,.mp3,.wav,.ppt,.pptx"
                            />
                        </div>

                        {/* File Type Selection and Submit */}
                        <div className='flex flex-col lg:flex-row gap-6 items-center justify-between'>
                            {/* File Type Selection */}
                            <div className='flex-1'>
                                <label className='block text-sm font-medium text-gray-300 mb-3'>
                                    Select Content Type
                                </label>
                                <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                                    {fileTypeOptions.map((option) => {
                                        const IconComponent = option.icon;
                                        return (
                                            <button
                                                key={option.value}
                                                onClick={() => setFileType(option.value)}
                                                className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-300 ${
                                                    fileType === option.value
                                                        ? 'border-blue-400 bg-blue-900/30 text-blue-300'
                                                        : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50 text-gray-300'
                                                }`}
                                            >
                                                <IconComponent className="text-xl" />
                                                <span className='font-medium'>{option.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className='flex-shrink-0 pt-8'>
                                <button 
                                    onClick={handleSubmit} 
                                    disabled={!selectedFile}
                                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                                        selectedFile
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:scale-105 shadow-lg'
                                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    {selectedFile ? 'Process File' : 'Select a file first'}
                                </button>
                            </div>
                        </div>

                        {/* Supported File Types */}
                        <div className='mt-8 pt-6 border-t border-gray-700'>
                            <p className='text-sm text-gray-400 text-center'>
                                Supported formats: PDF, DOC, DOCX, TXT, MP4, MP3, WAV, PPT, PPTX
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className='max-w-6xl mx-auto mt-16'>
                    <h2 className='text-3xl font-bold text-center text-white mb-12'>
                        What you can do with Learnly
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div className='bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 hover:shadow-xl hover:border-gray-600 transition-all duration-300'>
                            <div className='w-12 h-12 bg-blue-900/50 rounded-xl flex items-center justify-center mb-4'>
                                <MdDescription className="text-2xl text-blue-400" />
                            </div>
                            <h3 className='text-xl font-semibold text-white mb-2'>Smart Notes</h3>
                            <p className='text-gray-400'>
                                Transform your documents into structured, searchable notes with AI-powered organization.
                            </p>
                        </div>
                        <div className='bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 hover:shadow-xl hover:border-gray-600 transition-all duration-300'>
                            <div className='w-12 h-12 bg-purple-900/50 rounded-xl flex items-center justify-center mb-4'>
                                <MdVideoLibrary className="text-2xl text-purple-400" />
                            </div>
                            <h3 className='text-xl font-semibold text-white mb-2'>Video Processing</h3>
                            <p className='text-gray-400'>
                                Extract key insights from lectures and videos with automatic transcription and summarization.
                            </p>
                        </div>
                        <div className='bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 hover:shadow-xl hover:border-gray-600 transition-all duration-300'>
                            <div className='w-12 h-12 bg-green-900/50 rounded-xl flex items-center justify-center mb-4'>
                                <MdMenuBook className="text-2xl text-green-400" />
                            </div>
                            <h3 className='text-xl font-semibold text-white mb-2'>Study Materials</h3>
                            <p className='text-gray-400'>
                                Convert readings and textbooks into interactive study guides and flashcards.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { useState } from 'react'
import { MdFileUpload, MdCloudUpload, MdDescription, MdVideoLibrary, MdMenuBook } from "react-icons/md";
import toast from 'react-hot-toast';

export default function Home() {
    const [fileType, setFileType] = useState("notes");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [fileTitle, setFileTitle] = useState('');
    const [showTitleInput, setShowTitleInput] = useState(false);

    function handleUpload(event) {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileTitle(file.name.replace(/\.[^/.]+$/, '')); // Set default title from filename
            setShowTitleInput(true);
            console.log("File uploaded:", file.name);
            toast.success(`File "${file.name}" selected successfully!`);
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
            setFileTitle(file.name.replace(/\.[^/.]+$/, '')); // Set default title from filename
            setShowTitleInput(true);
            console.log("File dropped:", file.name);
            toast.success(`File "${file.name}" dropped successfully!`);
        }
    }

    async function handleSubmit() {
        if (!selectedFile) {
            toast.error("Please select a file first!");
            return;
        }

        if (!fileTitle.trim()) {
            toast.error("Please enter a title for your file!");
            return;
        }

        setIsUploading(true);
        
        try {
            // Simulate API call
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate 90% success rate
                    if (Math.random() > 0.1) {
                        resolve();
                    } else {
                        reject(new Error("Upload failed"));
                    }
                }, 2000);
            });

            console.log("Submitting file:", selectedFile.name, "Type:", fileType, "Title:", fileTitle);
            toast.success(`File "${fileTitle}" uploaded successfully!`);
            
            // Reset form
            setSelectedFile(null);
            setFileType("notes");
            setFileTitle('');
            setShowTitleInput(false);
        } catch (error) {
            console.error("Upload error:", error);
            toast.error(`Failed to upload "${fileTitle}". Please try again.`);
        } finally {
            setIsUploading(false);
        }
    }

    const fileTypeOptions = [
        { value: "notes", label: "Notes", icon: MdDescription },
        { value: "lecture", label: "Lecture", icon: MdVideoLibrary },
        { value: "readings", label: "Readings", icon: MdMenuBook },
    ];

    return (
        <div className='min-h-screen bg-gray-900 pl-80'>
            <div className='container mx-auto px-8 py-12'>
                {/* Header Section */}
                <div className='text-center mb-12'>
                    <h1 className='text-5xl font-bold text-white mb-4'>
                        Welcome to Learnly
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

                        {/* Title Input - shown after file selection */}
                        {showTitleInput && (
                            <div className='mb-8'>
                                <label className='block text-sm font-medium text-gray-300 mb-3'>
                                    File Title <span className='text-red-400'>*</span>
                                </label>
                                <input
                                    type='text'
                                    value={fileTitle}
                                    onChange={(e) => setFileTitle(e.target.value)}
                                    className='w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500'
                                    placeholder='Enter a title for your file...'
                                    required
                                />
                            </div>
                        )}

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
                                                className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
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
                                    disabled={!selectedFile || isUploading || !fileTitle.trim()}
                                    className={`w-[200px] h-[60px] px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 ${
                                        selectedFile && !isUploading && fileTitle.trim()
                                            ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                                            : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                    }`}
                                >
                                    {isUploading ? (
                                        <div className="flex flex-row space-x-2">
                                            <div className='w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mb-2'></div>
                                            <span>Uploading...</span>
                                        </div>
                                    ) : (
                                        selectedFile ? (fileTitle.trim() ? 'Process File' : 'Enter title first') : 'Select a file first'
                                    )}
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
            </div>
        </div>
    )
}
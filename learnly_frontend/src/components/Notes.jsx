import { useState } from 'react'
import { MdAdd, MdDelete, MdOpenInNew, MdSearch, MdFilterList } from 'react-icons/md'

export default function Notes() {
    // Mock data - in real app, this would come from backend
    const [notes, setNotes] = useState([
        {
            id: 1,
            title: 'Introduction to Machine Learning',
            preview: 'Machine learning is a subset of artificial intelligence that focuses on...',
            date: '2024-01-15',
            category: 'lecture',
            fileSize: '2.4 MB'
        },
        {
            id: 2,
            title: 'React Component Lifecycle',
            preview: 'Understanding how React components mount, update, and unmount...',
            date: '2024-01-12',
            category: 'notes',
            fileSize: '1.8 MB'
        },
        {
            id: 3,
            title: 'Database Design Principles',
            preview: 'Key principles for designing efficient and scalable databases...',
            date: '2024-01-10',
            category: 'readings',
            fileSize: '3.2 MB'
        },
    ])

    const [searchQuery, setSearchQuery] = useState('')
    const [isAddingNote, setIsAddingNote] = useState(false)
    const [newNoteTitle, setNewNoteTitle] = useState('')
    const [newNoteFile, setNewNoteFile] = useState(null)

    function handleFileSelect(event) {
        const file = event.target.files[0]
        if (file) {
            setNewNoteFile(file)
            setNewNoteTitle(file.name.replace(/\.[^/.]+$/, ''))
        }
    }

    function handleAddNote() {
        if (newNoteTitle && newNoteFile) {
            const newNote = {
                id: notes.length + 1,
                title: newNoteTitle,
                preview: 'File uploaded successfully...',
                date: new Date().toISOString().split('T')[0],
                category: 'notes',
                fileSize: (newNoteFile.size / 1024 / 1024).toFixed(2) + ' MB'
            }
            // TODO: Upload to backend
            console.log('Uploading note to backend:', newNote)
            setNotes([newNote, ...notes])
            setIsAddingNote(false)
            setNewNoteTitle('')
            setNewNoteFile(null)
        }
    }

    function handleDeleteNote(id) {
        // TODO: Delete from backend
        console.log('Deleting note from backend:', id)
        setNotes(notes.filter(note => note.id !== id))
    }

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.preview.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 pl-80'>
            <div className='container mx-auto px-8 py-12'>
                {/* Header Section */}
                <div className='mb-8 flex justify-between items-center'>
                    <div>
                        <h1 className='text-5xl font-bold text-white mb-2'>
                            My <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>Notes</span>
                        </h1>
                        <p className='text-xl text-gray-300'>
                            Organize and manage your study materials
                        </p>
                    </div>
                    <button
                        onClick={() => setIsAddingNote(!isAddingNote)}
                        className='flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer'
                    >
                        <MdAdd className='text-2xl text-white' />
                        <span className='text-white font-semibold'>New Note</span>
                    </button>
                </div>

                {/* Add New Note Section */}
                {isAddingNote && (
                    <div className='mb-8 bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700'>
                        <h2 className='text-2xl font-semibold text-white mb-4'>Upload New Note</h2>
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-300 mb-2'>
                                    Note Title
                                </label>
                                <input
                                    type='text'
                                    value={newNoteTitle}
                                    onChange={(e) => setNewNoteTitle(e.target.value)}
                                    className='w-full px-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:border-blue-500'
                                    placeholder='Enter note title...'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-300 mb-2'>
                                    Upload File
                                </label>
                                <input
                                    type='file'
                                    onChange={handleFileSelect}
                                    className='w-full px-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:border-blue-500'
                                    accept='.pdf,.doc,.docx,.txt'
                                />
                                {newNoteFile && (
                                    <p className='text-green-400 mt-2'>{newNoteFile.name} selected</p>
                                )}
                            </div>
                            <div className='flex justify-end space-x-3'>
                                <button
                                    onClick={() => {
                                        setIsAddingNote(false)
                                        setNewNoteTitle('')
                                        setNewNoteFile(null)
                                    }}
                                    className='px-6 py-2 bg-gray-600 text-gray-300 rounded-xl hover:bg-gray-500 transition-colors duration-300 cursor-pointer'
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddNote}
                                    disabled={!newNoteTitle || !newNoteFile}
                                    className={`px-6 py-2 rounded-xl transition-all duration-300 ${
                                        newNoteTitle && newNoteFile
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 cursor-pointer'
                                            : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                                    }`}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search and Filter Section */}
                <div className='mb-6 flex gap-4'>
                    <div className='flex-1 relative'>
                        <MdSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search notes...'
                            className='w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <button className='px-4 py-3 bg-gray-800 rounded-xl border border-gray-700 hover:bg-gray-700 transition-colors duration-300 cursor-pointer'>
                        <MdFilterList className='text-gray-300 text-xl' />
                    </button>
                </div>

                {/* Notes Grid */}
                {filteredNotes.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredNotes.map((note) => (
                            <div
                                key={note.id}
                                className='bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl hover:border-gray-600 transition-all duration-300 overflow-hidden group flex flex-col'
                            >
                                <div className='p-6 flex-1'>
                                    <div className='flex justify-between items-start mb-3'>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            note.category === 'lecture' 
                                                ? 'bg-purple-900/50 text-purple-300'
                                                : note.category === 'readings'
                                                ? 'bg-green-900/50 text-green-300'
                                                : 'bg-blue-900/50 text-blue-300'
                                        }`}>
                                            {note.category}
                                        </span>
                                        <button
                                            onClick={() => handleDeleteNote(note.id)}
                                            className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-400 hover:text-red-300 cursor-pointer'
                                        >
                                            <MdDelete className='text-xl' />
                                        </button>
                                    </div>
                                    <h3 className='text-xl font-semibold text-white mb-2 line-clamp-2'>
                                        {note.title}
                                    </h3>
                                    <p className='text-gray-400 text-sm mb-4 line-clamp-2'>
                                        {note.preview}
                                    </p>
                                    <div className='flex justify-between items-center text-sm text-gray-500'>
                                        <span>{note.date}</span>
                                        <span>{note.fileSize}</span>
                                    </div>
                                </div>
                                <div className='px-6 py-4 bg-gray-700/50 flex justify-end mt-auto'>
                                    <button className='flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer'>
                                        <MdOpenInNew className='text-lg' />
                                        <span className='font-medium'>Open</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-16'>
                        <p className='text-gray-400 text-xl'>
                            {searchQuery ? 'No notes found matching your search.' : 'No notes yet. Upload your first note!'}
                        </p>
                    </div>
                )}

                {/* Stats Section */}
                <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='bg-gray-800 rounded-2xl p-6 border border-gray-700'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-gray-400 text-sm mb-1'>Total Notes</p>
                                <p className='text-3xl font-bold text-white'>{notes.length}</p>
                            </div>
                            <div className='w-12 h-12 bg-blue-900/50 rounded-xl flex items-center justify-center'>
                                <MdOpenInNew className='text-2xl text-blue-400' />
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray-800 rounded-2xl p-6 border border-gray-700'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-gray-400 text-sm mb-1'>This Week</p>
                                <p className='text-3xl font-bold text-white'>3</p>
                            </div>
                            <div className='w-12 h-12 bg-purple-900/50 rounded-xl flex items-center justify-center'>
                                <MdAdd className='text-2xl text-purple-400' />
                            </div>
                        </div>
                    </div>
                    <div className='bg-gray-800 rounded-2xl p-6 border border-gray-700'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-gray-400 text-sm mb-1'>Total Size</p>
                                <p className='text-3xl font-bold text-white'>7.4 MB</p>
                            </div>
                            <div className='w-12 h-12 bg-green-900/50 rounded-xl flex items-center justify-center'>
                                <MdFilterList className='text-2xl text-green-400' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

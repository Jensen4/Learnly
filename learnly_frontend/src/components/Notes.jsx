import { useState } from 'react'
import { MdAdd, MdDelete, MdOpenInNew, MdSearch, MdFilterList, MdEdit, MdCheck, MdClose } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Notes() {
    const navigate = useNavigate()
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
    const [editingNoteId, setEditingNoteId] = useState(null)
    const [editingTitle, setEditingTitle] = useState('')

    function handleEditTitle(note) {
        setEditingNoteId(note.id)
        setEditingTitle(note.title)
    }

    function handleSaveTitle(noteId) {
        if (!editingTitle.trim()) {
            toast.error("Title cannot be empty!")
            return
        }
        
        setNotes(notes.map(note => 
            note.id === noteId 
                ? { ...note, title: editingTitle.trim() }
                : note
        ))
        setEditingNoteId(null)
        setEditingTitle('')
        toast.success("Title updated successfully!")
    }

    function handleCancelEdit() {
        setEditingNoteId(null)
        setEditingTitle('')
    }

    function handleNewNote() {
        navigate('/home')
    }

    function handleDeleteNote(id) {
        const note = notes.find(n => n.id === id)
        console.log('Deleting note from backend:', id)
        setNotes(notes.filter(note => note.id !== id))
        toast.success(`Note "${note?.title}" deleted successfully!`)
    }

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.preview.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className='min-h-screen bg-gray-900 pl-80'>
            <div className='container mx-auto px-8 py-12'>
                {/* Header Section */}
                <div className='mb-8 flex justify-between items-center'>
                    <div>
                        <h1 className='text-5xl font-bold text-white mb-2'>
                            My Notes
                        </h1>
                        <p className='text-xl text-gray-300'>
                            Organize and manage your study materials
                        </p>
                    </div>
                    <button
                        onClick={handleNewNote}
                        className='flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-sm hover:shadow cursor-pointer'
                    >
                        <MdAdd className='text-2xl text-white' />
                        <span className='text-white font-semibold'>New Note</span>
                    </button>
                </div>

                {/* Search and Filter Section */}
                <div className='mb-6 flex gap-4'>
                    <div className='flex-1 relative'>
                        <MdSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search notes...'
                            className='w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <button className='px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors duration-200 cursor-pointer'>
                        <MdFilterList className='text-gray-300 text-xl' />
                    </button>
                </div>

                {/* Notes Grid */}
                {filteredNotes.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredNotes.map((note) => (
                            <div
                                key={note.id}
                                className='bg-gray-800 rounded-lg shadow-sm border border-gray-700 hover:shadow-md hover:border-gray-600 transition-all duration-200 overflow-hidden group flex flex-col'
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
                                            className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-400 hover:text-red-300 cursor-pointer'
                                        >
                                            <MdDelete className='text-xl' />
                                        </button>
                                    </div>
                                    {editingNoteId === note.id ? (
                                        <div className='mb-2'>
                                            <input
                                                type='text'
                                                value={editingTitle}
                                                onChange={(e) => setEditingTitle(e.target.value)}
                                                className='w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 text-xl font-semibold'
                                                autoFocus
                                            />
                                            <div className='flex space-x-2 mt-2'>
                                                <button
                                                    onClick={() => handleSaveTitle(note.id)}
                                                    className='p-1 text-green-400 hover:text-green-300 cursor-pointer'
                                                >
                                                    <MdCheck className='text-lg' />
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className='p-1 text-red-400 hover:text-red-300 cursor-pointer'
                                                >
                                                    <MdClose className='text-lg' />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='flex items-center justify-between mb-2'>
                                            <h3 className='text-xl font-semibold text-white line-clamp-2 flex-1'>
                                                {note.title}
                                            </h3>
                                            <button
                                                onClick={() => handleEditTitle(note)}
                                                className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-400 hover:text-blue-300 cursor-pointer ml-2'
                                            >
                                                <MdEdit className='text-lg' />
                                            </button>
                                        </div>
                                    )}
                                    <p className='text-gray-400 text-sm mb-4 line-clamp-2'>
                                        {note.preview}
                                    </p>
                                    <div className='flex justify-between items-center text-sm text-gray-500'>
                                        <span>{note.date}</span>
                                        <span>{note.fileSize}</span>
                                    </div>
                                </div>
                                <div className='px-6 py-4 bg-gray-700/50 flex justify-end mt-auto'>
                                    <button className='flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 cursor-pointer'>
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
            </div>
        </div>
    )
}

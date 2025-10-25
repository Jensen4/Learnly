import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center'>
                <div className='text-center'>
                    <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
                    <p className='text-gray-300'>Loading...</p>
                </div>
            </div>
        )
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />
}

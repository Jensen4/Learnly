import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import NotesPage from './pages/NotesPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function AppRoutes() {
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

    return (
        <Routes>
            {/* Redirect root to login if not authenticated, home if authenticated */}
            <Route 
                path="/" 
                element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} 
            />
            
            {/* Authentication routes - only accessible when not logged in */}
            <Route 
                path="/login" 
                element={isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />} 
            />
            <Route 
                path="/register" 
                element={isAuthenticated ? <Navigate to="/home" replace /> : <RegisterPage />} 
            />
            
            {/* Protected routes - only accessible when logged in */}
            <Route 
                path="/home" 
                element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/quizzes" 
                element={
                    <ProtectedRoute>
                        <QuizPage />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/notes" 
                element={
                    <ProtectedRoute>
                        <NotesPage />
                    </ProtectedRoute>
                } 
            />
        </Routes>
    )
}

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </BrowserRouter>
        </>
    )
}

export default App

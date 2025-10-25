import { useState } from 'react'
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdLogin } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    function handleInputChange(e) {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        setError('') // Clear error when user types
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        
        try {
            const result = await login(formData.email, formData.password)
            if (result.success) {
                navigate('/home')
            } else {
                setError(result.error || 'Login failed')
            }
        } catch (error) {
            setError('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center px-4'>
            <div className='w-full max-w-md'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-white mb-2'>
                        Welcome to <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>Learnly</span>
                    </h1>
                    <p className='text-gray-300'>Sign in to your account</p>
                </div>

                {/* Login Form */}
                <div className='bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700'>
                    {error && (
                        <div className='mb-6 p-4 bg-red-900/20 border border-red-700 rounded-xl'>
                            <p className='text-red-300 text-sm'>{error}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Email Field */}
                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-2'>
                                Email Address
                            </label>
                            <div className='relative'>
                                <MdEmail className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full pl-12 pr-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300'
                                    placeholder='Enter your email'
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-2'>
                                Password
                            </label>
                            <div className='relative'>
                                <MdLock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full pl-12 pr-12 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300'
                                    placeholder='Enter your password'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-300 cursor-pointer'
                                >
                                    {showPassword ? <MdVisibilityOff className='text-xl' /> : <MdVisibility className='text-xl' />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className='flex items-center justify-between'>
                            <label className='flex items-center cursor-pointer'>
                                <input
                                    type='checkbox'
                                    className='w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 focus:ring-0 focus:outline-none cursor-pointer'
                                />
                                <span className='ml-2 text-sm text-gray-300'>Remember me</span>
                            </label>
                            <button
                                type='button'
                                className='text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer'
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            disabled={isLoading || !formData.email || !formData.password}
                            className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                                isLoading || !formData.email || !formData.password
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:scale-105 shadow-lg cursor-pointer'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className='w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin'></div>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <MdLogin className='text-xl' />
                                    <span>Sign In</span>
                                </>
                            )}
                        </button>
                    </form>

                </div>

                {/* Sign Up Link */}
                <div className='text-center mt-8'>
                    <p className='text-gray-400'>
                        Don't have an account?{' '}
                        <Link 
                            to='/register' 
                            className='text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer'
                        >
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

import { useState } from 'react'
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdPerson, MdSchool, MdCheckCircle } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Register() {
    const { register } = useAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'student'
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)
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
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!')
            return
        }
        
        if (!agreedToTerms) {
            setError('Please agree to the terms and conditions!')
            return
        }
        
        setIsLoading(true)
        setError('')
        
        try {
            const result = await register(formData)
            if (result.success) {
                navigate('/home')
            } else {
                setError(result.error || 'Registration failed')
            }
        } catch (error) {
            setError('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    const userTypes = [
        { value: 'student', label: 'Student', icon: MdSchool },
        { value: 'teacher', label: 'Teacher', icon: MdPerson }
    ]

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center px-4 py-8'>
            <div className='w-full max-w-md'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-white mb-2'>
                        Join <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>Learnly</span>
                    </h1>
                    <p className='text-gray-300'>Create your account to get started</p>
                </div>

                {/* Registration Form */}
                <div className='bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700'>
                    {error && (
                        <div className='mb-6 p-4 bg-red-900/20 border border-red-700 rounded-xl'>
                            <p className='text-red-300 text-sm'>{error}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Name Fields */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-300 mb-2'>
                                    First Name
                                </label>
                                <div className='relative'>
                                    <MdPerson className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
                                    <input
                                        type='text'
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className='w-full pl-12 pr-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300'
                                        placeholder='John'
                                    />
                                </div>
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-300 mb-2'>
                                    Last Name
                                </label>
                                <div className='relative'>
                                    <MdPerson className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
                                    <input
                                        type='text'
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className='w-full pl-12 pr-4 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300'
                                        placeholder='Doe'
                                    />
                                </div>
                            </div>
                        </div>

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
                                    placeholder='john.doe@example.com'
                                />
                            </div>
                        </div>

                        {/* User Type Selection */}
                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-3'>
                                I am a...
                            </label>
                            <div className='grid grid-cols-2 gap-3'>
                                {userTypes.map((type) => {
                                    const IconComponent = type.icon;
                                    return (
                                        <button
                                            key={type.value}
                                            type='button'
                                            onClick={() => setFormData(prev => ({ ...prev, userType: type.value }))}
                                            className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                                                formData.userType === type.value
                                                    ? 'border-blue-400 bg-blue-900/30 text-blue-300'
                                                    : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50 text-gray-300'
                                            }`}
                                        >
                                            <IconComponent className="text-xl" />
                                            <span className='font-medium'>{type.label}</span>
                                        </button>
                                    );
                                })}
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
                                    minLength={8}
                                    className='w-full pl-12 pr-12 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300'
                                    placeholder='Create a strong password'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-300 cursor-pointer'
                                >
                                    {showPassword ? <MdVisibilityOff className='text-xl' /> : <MdVisibility className='text-xl' />}
                                </button>
                            </div>
                            <p className='text-xs text-gray-400 mt-1'>Must be at least 8 characters long</p>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-2'>
                                Confirm Password
                            </label>
                            <div className='relative'>
                                <MdLock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name='confirmPassword'
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full pl-12 pr-12 py-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-300'
                                    placeholder='Confirm your password'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-300 cursor-pointer'
                                >
                                    {showConfirmPassword ? <MdVisibilityOff className='text-xl' /> : <MdVisibility className='text-xl' />}
                                </button>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className='flex items-start space-x-3'>
                            <input
                                type='checkbox'
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className='w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 focus:ring-0 focus:outline-none cursor-pointer mt-1'
                            />
                            <label className='text-sm text-gray-300 cursor-pointer'>
                                I agree to the{' '}
                                <button type='button' className='text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer'>
                                    Terms of Service
                                </button>
                                {' '}and{' '}
                                <button type='button' className='text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer'>
                                    Privacy Policy
                                </button>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            disabled={isLoading || !agreedToTerms || formData.password !== formData.confirmPassword}
                            className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                                isLoading || !agreedToTerms || formData.password !== formData.confirmPassword
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:scale-105 shadow-lg cursor-pointer'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className='w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin'></div>
                                    <span>Creating account...</span>
                                </>
                            ) : (
                                <>
                                    <MdCheckCircle className='text-xl' />
                                    <span>Create Account</span>
                                </>
                            )}
                        </button>
                    </form>

                </div>

                {/* Sign In Link */}
                <div className='text-center mt-8'>
                    <p className='text-gray-400'>
                        Already have an account?{' '}
                        <Link 
                            to='/login' 
                            className='text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer'
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check for existing session on app load
        const checkAuth = async () => {
            try {
                // Check localStorage for existing session
                const savedUser = localStorage.getItem('learnly_user')
                if (savedUser) {
                    const userData = JSON.parse(savedUser)
                    setUser(userData)
                }
            } catch (error) {
                console.error('Error checking authentication:', error)
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = async (email, password) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            
            // Mock user data - in real app, this would come from API
            const userData = {
                id: 1,
                email: email,
                firstName: 'John',
                lastName: 'Doe',
                userType: 'student',
                avatar: null
            }
            
            setUser(userData)
            localStorage.setItem('learnly_user', JSON.stringify(userData))
            return { success: true, user: userData }
        } catch (error) {
            console.error('Login error:', error)
            return { success: false, error: 'Login failed' }
        }
    }

    const register = async (userData) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            // Mock user data - in real app, this would come from API
            const newUser = {
                id: Date.now(),
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                userType: userData.userType,
                avatar: null
            }
            
            setUser(newUser)
            localStorage.setItem('learnly_user', JSON.stringify(newUser))
            return { success: true, user: newUser }
        } catch (error) {
            console.error('Registration error:', error)
            return { success: false, error: 'Registration failed' }
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('learnly_user')
    }

    const value = {
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


import { createContext, useContext, useEffect, useState } from 'react'
import { IUser, IContextType } from '@/types';
import { getCurrentUser } from '@/lib/appwrite/api';
import { useNavigate } from 'react-router-dom';


// User's default values. That mean, when we get access to user from the context, we can
// we can aceess to those informations about the user.
const INITIAL_USER = {
    id: '', 
    name: '', 
    username: '', 
    email: '', 
    imageUrl: '',
    bio: ''
} 


//Default value to initialize state 
const INITIAL_STATE = {
    user: INITIAL_USER,  
    isLoading: false, 
    isAuthenticated: false, 
    setUser: () => { },
    setIsAuthenticated: () => { }, 
    checkAuthUser: async () => false as boolean 
}


//Creating of the context
export const AuthContext = createContext<IContextType>(INITIAL_STATE)

//Creating of a personalized hook to use the context 
export const useUSerContext = () => useContext(AuthContext)


//Creating of the provider
export default function AuthProvider({children}: {children: React.ReactNode}) {
        
    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()
   // const location = useLocation() 

    /**
     * This function check if the user is authenticated by getting his informations from database.
     * If yes, the user's informations are setted in the context and isAuthenticated is set to true.
     *  
     * @returns boolean: True if the is authenticated
     */
    const checkAuthUser = async () => {
        try {
            const currentAccount = await getCurrentUser(); 

            if (currentAccount) {
                setUser({
                    id: currentAccount.$id, 
                    name: currentAccount.name, 
                    username: currentAccount.username, 
                    email: currentAccount.email, 
                    imageUrl: currentAccount.imageUrl, 
                    bio: currentAccount.bio
                })
                setIsAuthenticated(true)            
                return true
            }

            return false

        } catch (error) {
            console.log(error)
            return false;
        } finally {
         setIsLoading(false)   
        }
    }

    useEffect(() => {
        
        //If user doesn't have valid session, redirect him to signin form
        const cookieFallback = localStorage.getItem('cookieFallback');
        //const isSignUpPage = location.pathname === '/sign-up';

        if ((cookieFallback === '[]' || cookieFallback === null))
        {
            navigate('/sign-in');
        }
        
        checkAuthUser();    
        
    
    }, [])

    
    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated, 
        checkAuthUser,
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
  )
}

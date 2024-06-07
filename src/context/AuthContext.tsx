
import { createContext, useContext, useEffect, useState } from 'react'
import { IUser, IContextType } from '@/types';
import { getCurrentUser } from '@/lib/appwrite/api';
import { useNavigate } from 'react-router-dom';



const INITIAL_USER = {
    id: '', 
    name: '', 
    username: '', 
    email: '', 
    imageUrl: '',
    bio: ''
} 


const INITIAL_STATE = {
    user: INITIAL_USER,  
    isLoading: false, 
    isAuthenticated: false, 
    setUser: () => { },
    setIsAuthenticated: () => { }, 
    checkAuthUser: async () => false as boolean, 
}


export const AuthContext = createContext<IContextType>(INITIAL_STATE)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
        
    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false); 
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const navigate = useNavigate(); 

    //A function that check if the user is authenticated
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

        const cookieFallback = localStorage.getItem('cookieFallback');
        if (cookieFallback === '[]' || cookieFallback === null)
            navigate('/sign-in');
        
        checkAuthUser();
    
    }, [navigate])

    
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

//export default AuthProvider

export const useUSerContext = () => useContext(AuthContext)
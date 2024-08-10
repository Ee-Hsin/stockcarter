import { createContext, ReactNode } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  User,
  UserCredential,
} from 'firebase/auth'
import { auth } from '../firebase'
import { UserDetails } from '../types/userTypes'
import { useAuthState } from './useAuthState'

export interface AuthContextType {
  user: User | null
  userDetails: UserDetails | null
  createUser: (email: string, password: string) => Promise<UserCredential>
  signIn: (email: string, password: string) => Promise<UserCredential>
  signInWithGoogle: () => Promise<UserCredential>
  resetPassword: (email: string) => Promise<void>
  logOut: () => Promise<void>
  isAuthenticated: boolean
}
export const UserContext = createContext<AuthContextType | null>(null)

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const { user, userDetails, isAuthenticated } = useAuthState()

  console.log('user', user)
  console.log('userDetails', userDetails)

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = () => {
    return signOut(auth)
  }

  return (
    <UserContext.Provider
      value={{
        createUser,
        signIn,
        signInWithGoogle,
        resetPassword,
        user,
        userDetails,
        logOut,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

import { createContext, ReactNode } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
  resetPassword: (email: string) => Promise<void>
  logOut: () => Promise<void>
}
export const UserContext = createContext<AuthContextType | null>(null)

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const { user, userDetails } = useAuthState()

  console.log('user', user)
  console.log('userDetails', userDetails)

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = () => {
    return signOut(auth)
  }

  return (
    <UserContext.Provider
      value={{ createUser, signIn, resetPassword, user, userDetails, logOut }}
    >
      {children}
    </UserContext.Provider>
  )
}

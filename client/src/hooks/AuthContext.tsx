import { createContext, useState, useEffect, ReactNode } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  User,
  UserCredential,
} from 'firebase/auth'
import { auth } from '../firebase'

interface UserDetails {
  uid: string
  email: string
  name?: string
}

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
  const [user, setUser] = useState<User | null>(null)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser) {
        setUser(currUser)
        // fetchUserDetails(currUser.uid); // Call your backend to fetch user details
      } else {
        setUser(null)
        setUserDetails(null)
      }
    })

    return () => unsubscribe()
  }, [])

  // TODO: Set up endppoint in backend for this (might have to make it a websocket if we are actively listening
  //for changes in the user document in the database)
  // const fetchUserDetails = async (uid: string) => {
  //     try {
  //       const response = await fetch(https://yourapi.com/users/${uid});
  //       const data = await response.json();
  //       setUserDetails(data);
  //     } catch (error) {
  //       console.error("Failed to fetch user details", error);
  //     }
  //   };

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

import { User, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useGetUserDetails } from './queries/userQuery'
import { auth } from '../firebase'

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const {
    data: userDetails,
    isError,
    isPending,
    error,
  } = useGetUserDetails(isAuthenticated)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser)
      setIsAuthenticated(!!currUser)
    })
    return () => unsubscribe()
  }, [])

  return {
    user,
    userDetails: userDetails ?? null,
    isPending,
    isError,
    error,
    isAuthenticated,
  }
}

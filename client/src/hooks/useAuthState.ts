import { User, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useGetUserDetails } from './query'
import { auth } from '../firebase'

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null)
  const {
    data: userDetails,
    isError,
    isPending,
    error,
  } = useGetUserDetails(user?.uid ?? '')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser)
    })
    return () => unsubscribe()
  }, [])

  return { user, userDetails: userDetails ?? null, isPending, isError, error }
}

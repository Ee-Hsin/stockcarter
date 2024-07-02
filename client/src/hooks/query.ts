import { UserCredential } from 'firebase/auth'
import { useMutation } from '@tanstack/react-query'
import { SignInCredentials } from '../types/authenticationTypes'
import { useAuth } from '../hooks/useAuth'

export const useSignIn = () => {
  const { signIn } = useAuth()

  return useMutation<UserCredential, Error, SignInCredentials>({
    mutationFn: ({ email, password }: SignInCredentials) =>
      signIn(email, password),
    onError: (error: Error) => {
      console.error('Login failed:', error)
    },
    onSuccess: (userCredential: UserCredential) => {
      console.log('Login successful:', userCredential)
    },
  })
}

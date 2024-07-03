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

export const useCreateUser = () => {
  const { createUser } = useAuth()

  return useMutation<UserCredential, Error, SignInCredentials>({
    mutationFn: ({ email, password }: SignInCredentials) =>
      createUser(email, password),
    onError: (error: Error) => {
      console.error('Create user failed:', error)
    },
    onSuccess: (userCredential: UserCredential) => {
      //TODO: Set up endpoint to hit here with the userCredential object to create a new user Document in the database
      console.log('Create user successful:', userCredential)
    },
  })
}

export const useResetPassword = () => {
  const { resetPassword } = useAuth()

  return useMutation<void, Error, string>({
    mutationFn: (email: string) => resetPassword(email),
    onError: (error: Error) => {
      console.error('Reset password failed:', error)
    },
    onSuccess: () => {
      console.log('Reset password successful')
    },
  })
}

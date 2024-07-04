import { UserCredential } from 'firebase/auth'
import { useMutation, useQuery } from '@tanstack/react-query'
import { SignInCredentials } from '../types/authenticationTypes'
import { UserDetails } from '../types/userTypes'
import { useAuth } from '../hooks/useAuth'
import API from '../services/api'

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

export const useGoogleSignIn = () => {
  const { signInWithGoogle } = useAuth()

  return useMutation<UserCredential, Error, void>({
    mutationFn: () => signInWithGoogle(),
    onError: (error: Error) => {
      console.error('Login failed:', error)
    },
    onSuccess: async (userCredential: UserCredential) => {
      console.log('Google Login successful:', userCredential)
      //Now update the backend with the user's details (will create a new doc if not already present since signin with google works
      //for both first time sign up and sign in)
      try {
        const response = await API.post('/users', {
          email: userCredential.user.email,
          id: userCredential.user.uid,
          name: userCredential.user.displayName,
          isAdmin: false,
        })
        console.log('User updated/created successfully:', response.data)
      } catch (error) {
        console.error('Failed to create/update user:', error)
      }
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
    onSuccess: async (userCredential: UserCredential) => {
      console.log('Create user successful:', userCredential)
      try {
        const response = await API.post('/users', {
          email: userCredential.user.email,
          id: userCredential.user.uid,
          isAdmin: false,
        })
        console.log('User created successfully:', response.data)
      } catch (error) {
        console.error('Failed to create/update user:', error)
      }
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

export const useGetUserDetails = (userId: string) => {
  return useQuery<UserDetails, Error>({
    queryKey: ['userDetails', userId],
    queryFn: async () => {
      const { data } = await API.get(`/users/${userId}`)
      return data
    },
    enabled: !!userId,
  })
}

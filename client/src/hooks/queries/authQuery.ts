import { UserCredential } from 'firebase/auth'
import { useMutation } from '@tanstack/react-query'
import { SignInCredentials } from '../../types/authenticationTypes'
import { useAuth } from '../useAuth'
import API from '../../services/api'

export const useSignIn = () => {
  const { signIn } = useAuth()

  return useMutation<UserCredential, Error, SignInCredentials>({
    mutationFn: ({ email, password }: SignInCredentials) =>
      signIn(email, password),
    onError: (error: Error) => {
      console.error('Login failed:', error)
    },
    onSuccess: () => {
      console.log('Login successful')
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
      console.log('Google Login successful')
      //Now update the backend with the user's details (will create a new doc if not already present since signin with google works
      //for both first time sign up and sign in)

      //NOTE: Fetch the token right after user signs in, and provide it in the Authorization header just in case axios interceptor
      //does not detect user and add token in time
      const token = await userCredential.user.getIdToken()
      try {
        const response = await API.post(
          '/users',
          {
            email: userCredential.user.email,
            name: userCredential.user.displayName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        console.log('User created successfully:', response.data)
      } catch (error) {
        console.log('User already exists, updating instead')
        try {
          await API.put(
            '/users',
            {
              email: userCredential.user.email,
              name: userCredential.user.displayName,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          console.log('User updated successfully')
        } catch (updateError) {
          console.error('Failed to update user:', updateError)
        }
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
      console.log('Create Firebase user successful')
      //NOTE: Fetch the token right after user is created, and provide it in the Authorization header just in case axios interceptor
      //does not detect user and add token in time
      // const token = await userCredential.user.getIdToken()
      try {
        await API.post('/users', {
          email: userCredential.user.email,
        })
        console.log('User created in backend successfully')
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

import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Loader } from '../UI/Loader'
import { useSignIn, useGoogleSignIn } from '../../hooks/queries/authQuery'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AlreadyLoggedIn } from '../UI/AlreadyLoggedIn'
import './GoogleSignInButton.css'
import GoogleSignInButton from './GoogleSignInButton'

interface SignInFormData {
  email: string
  password: string
}

export const SignIn: React.FC = () => {
  const { user } = useAuth()
  const mutation = useSignIn()
  const googleMutation = useGoogleSignIn()

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<SignInFormData>()

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    //Ensure user can't sign in when already signed in
    if (user) return
    mutation.mutate(data)
    // reset() Don't rly need to reset the form here as if successful, it redirects them, and if not,
    // we want to leave the user with their previous response to allow them to fix it
  }

  const handleGoogleSignIn = () => {
    //Ensure user can't sign in when already signed in
    if (user) return
    googleMutation.mutate()
  }

  //NOTE: These two are not needed as we protect the route in the route file

  //Navigate after successful login
  if (mutation.isSuccess || googleMutation.isSuccess) {
    return <Navigate to="/dashboard" />
  }

  // Protects form for when User is alr signed in
  if (user) {
    return <AlreadyLoggedIn />
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          sign in
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {mutation.isPending ? (
          <Loader />
        ) : (
          <>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register('email', { required: 'Email is required' })}
                    className="focus:outline-none block w-full rounded-md border-0 p-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p role="alert" className="text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    {...register('password', {
                      required: 'Password is required',
                    })}
                    className="focus:outline-none block w-full rounded-md border-0 p-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <p role="alert" className="text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              {mutation.isError && (
                <p className="text-red-400">
                  your username or password is incorrect
                </p>
              )}
              <div className="text-sm">
                <Link
                  to="/forgotPassword"
                  className="font-semibold text-gray-500 hover:text-gray-600"
                >
                  forgot password?
                </Link>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-customPrimary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-customPrimaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customPrimary"
                >
                  sign in
                </button>
              </div>
            </form>
            <div className="mt-5 flex justify-center">
              <GoogleSignInButton
                onClick={handleGoogleSignIn}
              ></GoogleSignInButton>
            </div>
            <p className="mt-5 text-center text-sm text-gray-300">
              not a registered user?{' '}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-customLink hover:text-customLinkHover"
              >
                sign up here!
              </Link>{' '}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

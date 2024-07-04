import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Loader } from '../UI/Loader'
import { useSignIn, useGoogleSignIn } from '../../hooks/query'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AlreadyLoggedIn } from '../UI/AlreadyLoggedIn'

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

  //Navigate after successful login
  if (mutation.isSuccess) {
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
          Sign In
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {mutation.isPending ? (
          <Loader />
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-indigo-400"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', { required: 'Email is required' })}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
                  className="block text-sm font-medium leading-6 text-indigo-400"
                >
                  Password
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
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
                Your username or password is incorrect
              </p>
            )}
            <div className="text-sm">
              <Link
                to="/forgotPassword"
                className="font-semibold text-gray-600 hover:text-gray-500"
              >
                Forgot password?
              </Link>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            </div>
          </form>
        )}
        <button
          onClick={() => googleMutation.mutate()}
          className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible
        :outline-red-600"
        >
          Sign In with Google
        </button>
        <p className="mt-10 text-center text-sm text-gray-300">
          Not a Registered User?{' '}
          <Link
            to="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign Up here!
          </Link>{' '}
        </p>
      </div>
    </div>
  )
}

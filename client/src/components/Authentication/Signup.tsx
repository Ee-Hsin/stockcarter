import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreateUser, useGoogleSignIn } from '../../hooks/queries/authQuery'
import { FailureModal } from '../UI/FailureModal'
import { Loader } from '../UI/Loader'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { AlreadyLoggedIn } from '../UI/AlreadyLoggedIn'
import GoogleSignInButton from './GoogleSignInButton'

interface SignUpFormData {
  email: string
  password: string
}

export const SignUp = () => {
  const mutation = useCreateUser()
  const googleMutation = useGoogleSignIn()
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>()

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    //Don't allow submit if there is a user
    if (user) return
    mutation.mutate(data)
    reset()
  }

  const handleGoogleSignUp = () => {
    if (user) return
    googleMutation.mutate()
  }

  //NOTE: These two are not needed as we protect the route in the route file

  //Navigate after successful sign up
  if (mutation.isSuccess || googleMutation.isSuccess) {
    return <Navigate to="/onboarding" />
  }

  // Protects form for when User is alr signed in
  if (user) {
    return <AlreadyLoggedIn />
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {mutation.isError && mutation.error?.message && (
        <FailureModal
          mainMessage="Oops, looks like something went wrong."
          subMessage={mutation.error.message}
        />
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Register
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
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', {
                    required: 'An email is required',
                  })}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message:
                        'Password must include uppercase, lowercase, and numbers',
                    },
                  })}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-insetsm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p role="alert" className="text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-customPrimary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-customPrimaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customPrimaryHover"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}
        <div className="mt-5 flex justify-center">
          <GoogleSignInButton onClick={handleGoogleSignUp}></GoogleSignInButton>
        </div>
        <p className="mt-10 text-center text-sm text-gray-300">
          Already have an account?{' '}
          <Link
            to="/signin"
            className="font-semibold leading-6 text-customPrimary hover:text-customPrimaryHover"
          >
            Login Here!
          </Link>{' '}
        </p>
      </div>
    </div>
  )
}

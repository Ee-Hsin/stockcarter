//import { useState } from "react";

import { useRef, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useResetPassword } from '../../hooks/query'
import { FailureModal } from '../UI/FailureModal'
import { SuccessModal } from '../UI/SuccessModal'
import { Loader } from '../UI/Loader'

export const ForgotPassword: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const { user } = useAuth()
  const mutation = useResetPassword()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!emailRef.current?.value) return
    // Another layer of protection against user changing password when alr signed in
    if (user) return

    mutation.mutate(emailRef.current.value)
  }

  // Protects form for when User is alr signed in
  if (user) {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            You are already Logged in!
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {mutation.isError && (
        <FailureModal
          mainMessage="Oops, looks like something went wrong."
          subMessage="You may have typed the wrong email address or your account may not exist. 
          Please try again and contact us if the error persists"
        />
      )}
      {mutation.isSuccess && (
        <SuccessModal
          mainMessage="Reset Password Link Sent"
          subMessage="A link to reset your password has been sent to your email"
        />
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Forgot Password
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {mutation.isPending ? (
          <Loader />
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-indigo-500"
              >
                Email address{' '}
                <small className="text-sm font-semibold leading-6 text-gray-400">
                  {"(you'll receive a password reset link)"}
                </small>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  ref={emailRef}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        )}
        <p className="mt-10 text-center text-sm text-gray-800">
          Not a registered user?{' '}
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

import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Loader } from './UI/Loader'
import { FailureModal } from './UI/FailureModal'
import {
  ExperienceLevel,
  InvestmentTimeframe,
  InvestorType,
  OnboardingData,
} from '../types/onboardingTypes'
import { usePostOnboardingDetails } from '../hooks/queries/userQuery'
import { Navigate } from 'react-router-dom'

const Onboarding: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingData>()

  const mutation = usePostOnboardingDetails()

  const onSubmit: SubmitHandler<OnboardingData> = (data) => {
    const formattedData = {
      ...data,
      // Using type assertion to inform TypeScript that `age` is a string before conversion
      age: parseInt(data.age as unknown as string, 10),
    }
    mutation.mutate(formattedData)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      {mutation.isError && (
        <FailureModal
          mainMessage="Oops, something went wrong"
          subMessage={mutation.error?.message || 'Please try again'}
        />
      )}
      {mutation.isSuccess && <Navigate to="/dashboard" />}
      {mutation.isPending ? (
        <Loader />
      ) : (
        <form
          className="space-y-6 w-full max-w-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="max-w-md px-4 mx-auto mt-12">
            <label htmlFor="name" className="block py-2 text-gray-300">
              Name
            </label>
            <div className="flex items-center text-gray-700 border rounded-md">
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                placeholder="Jordan..."
                id="name"
                className="w-full p-2.5 outline-none"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="max-w-md px-4 mx-auto mt-12">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-300"
            >
              Age
            </label>
            <div className="flex items-center text-gray-700 border rounded-md">
              <input
                type="number"
                {...register('age', {
                  required: 'Age is required',
                  min: {
                    value: 18,
                    message: 'You must be at least 18 years old',
                  },
                })}
                placeholder="18+"
                id="age"
                className="w-full p-2.5 outline-none"
              />
            </div>
            {errors.age && (
              <p className="text-red-500 text-xs italic">
                {errors.age.message}
              </p>
            )}
          </div>
          <div className="max-w-md px-4 mx-auto mt-12">
            <label
              htmlFor="experienceLevel"
              className="block text-sm font-medium text-gray-300"
            >
              Experience Level
            </label>
            <div className="flex items-center text-gray-700 border rounded-md">
              <select
                {...register('experienceLevel', {
                  required: 'Experience level is required',
                })}
                id="experienceLevel" // Added unique ID
                className="w-full p-2.5 outline-none"
              >
                {Object.values(ExperienceLevel).map((level) => (
                  <option key={level} value={level}>
                    {level.toLocaleLowerCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="max-w-md px-4 mx-auto mt-12">
            <label
              htmlFor="investmentTimeframe"
              className="block text-sm font-medium text-gray-300"
            >
              Investment Timeframe
            </label>
            <div className="flex items-center text-gray-700 border rounded-md">
              <select
                {...register('investmentTimeframe', {
                  required: 'Investment timeframe is required',
                })}
                id="investmentTimeframe"
                className="w-full p-2.5 outline-none"
              >
                {Object.values(InvestmentTimeframe).map((timeframe) => (
                  <option key={timeframe} value={timeframe}>
                    {timeframe.toLocaleLowerCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="max-w-md px-4 mx-auto mt-12">
            <label
              htmlFor="investorType"
              className="block text-sm font-medium text-gray-300"
            >
              Investor Type
            </label>
            <div className="flex items-center text-gray-700 border rounded-md">
              <select
                {...register('investorType', {
                  required: 'Investor Type is required',
                })}
                id="investorType"
                className="w-full p-2.5 outline-none"
              >
                {Object.values(InvestorType).map((type) => (
                  <option key={type} value={type}>
                    {type.toLocaleLowerCase()}
                  </option>
                ))}
              </select>
            </div>
            {errors.investorType && (
              <p className="text-red-500 text-xs italic">
                {errors.investorType.message}
              </p>
            )}
          </div>
          <div className="max-w-md px-4 mx-auto mt-12">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-customPrimary hover:bg-customPrimaryHover focus:outline-none focus:bg-customPrimaryHover"
            >
              complete onboarding
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Onboarding

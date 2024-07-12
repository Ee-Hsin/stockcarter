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

const Onboarding: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm<OnboardingData>()

  const mutation = usePostOnboardingDetails()

  const onSubmit: SubmitHandler<OnboardingData> = (data) => {
    mutation.mutate(data)
  }

  const investorTypes = watch('investorType')

  // Handle change event for the multi-select dropdown
  const handleInvestorTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedOptions = Array.from(event.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value as InvestorType)

    if (selectedOptions.length > 2) {
      // Provide user feedback without changing the actual value
      setError('investorType', {
        type: 'manual',
        message: 'You can select up to 2 investor types.',
      })
    } else {
      clearErrors('investorType')
      setValue('investorType', selectedOptions, { shouldValidate: true })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      {mutation.isError && (
        <FailureModal
          mainMessage="Oops, something went wrong"
          subMessage={mutation.error?.message || 'Please try again'}
        />
      )}

      {mutation.isPending ? (
        <Loader />
      ) : (
        <form
          className="space-y-6 w-full max-w-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              {...register('age', { required: 'Age is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.age && (
              <p className="text-red-500 text-xs italic">
                {errors.age.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="experienceLevel"
              className="block text-sm font-medium text-gray-700"
            >
              Experience Level
            </label>
            <select
              {...register('experienceLevel', {
                required: 'Experience level is required',
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {Object.values(ExperienceLevel).map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="investmentTimeframe"
              className="block text-sm font-medium text-gray-700"
            >
              Investment Timeframe
            </label>
            <select
              {...register('investmentTimeframe', {
                required: 'Investment timeframe is required',
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {Object.values(InvestmentTimeframe).map((timeframe) => (
                <option key={timeframe} value={timeframe}>
                  {timeframe}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="investorType"
              className="block text-sm font-medium text-gray-700"
            >
              Investor Type
            </label>
            <select
              multiple
              onChange={handleInvestorTypeChange}
              value={investorTypes}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {Object.values(InvestorType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.investorType && (
              <p className="text-red-500 text-xs italic">
                {errors.investorType.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Complete Onboarding
          </button>
        </form>
      )}
    </div>
  )
}

export default Onboarding

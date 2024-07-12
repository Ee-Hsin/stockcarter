import { useQuery, useMutation } from '@tanstack/react-query'
import { UserDetails } from '../../types/userTypes'
import { OnboardingData } from '../../types/onboardingTypes'
import API from '../../services/api'

//This is used in useAuthState so that userDetails is always readily available throughout the app
export const useGetUserDetails = (isAuthenticated: boolean) => {
  return useQuery<UserDetails, Error>({
    queryKey: ['userDetails', isAuthenticated],
    queryFn: async () => {
      const { data } = await API.get(`/users`)
      return data
    },
    enabled: !!isAuthenticated,
  })
}

export const usePostOnboardingDetails = () => {
  return useMutation<void, Error, OnboardingData>({
    mutationFn: async (onboardingData: OnboardingData) => {
      const { data } = await API.put('/users', {
        ...onboardingData,
        isOnboarded: true,
      })
      return data
    },
    onError: (error: Error) => {
      console.error('Onboarding failed:', error)
    },
    onSuccess: () => {
      console.log('Onboarding successful:')
    },
  })
}

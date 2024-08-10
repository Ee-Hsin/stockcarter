import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { UserDetails } from '../../types/userTypes'
import { OnboardingData } from '../../types/onboardingTypes'
import API from '../../services/api'

// This is used in useAuthState so that userDetails is always readily available throughout the app
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
  const queryClient = useQueryClient() // Initialize query client here

  return useMutation<void, Error, OnboardingData>({
    mutationFn: async (onboardingData: OnboardingData) => {
      console.log('onboardingData:', onboardingData)
      await API.put('/users', {
        ...onboardingData,
        isOnboarded: true,
      })
    },
    onError: (error: Error) => {
      console.error('Onboarding failed:', error)
    },
    onSuccess: () => {
      console.log('Onboarding successful:')
      // Invalidate the userDetails query to ensure fresh data is fetched
      queryClient.invalidateQueries({ queryKey: ['userDetails'] })
    },
  })
}

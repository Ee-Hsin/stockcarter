import { useQuery } from '@tanstack/react-query'
import { UserDetails } from '../../types/userTypes'
import API from '../../services/api'

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

import { useQuery } from '@tanstack/react-query'
import { Transaction } from '../../types/transactionTypes'
import API from '../../services/api'

export const useGetTransactions = () => {
  return useQuery<Transaction[], Error>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data } = await API.get('/transactions')
      return data
    },
  })
}

import { useContext } from 'react'
import { UserContext, AuthContextType } from './AuthContext'

export const useAuth = (): AuthContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider')
  }
  return context
}

import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const DashboardPage: React.FC = () => {
  const { logOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async (): Promise<void> => {
    logOut()
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="bg-customSecondary">
      <button onClick={handleSignOut} className="text-white">
        Logout
      </button>
    </div>
  )
}

export default DashboardPage

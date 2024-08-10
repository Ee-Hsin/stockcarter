import React from 'react'
import { useAuth } from '../hooks/useAuth'

const LandingPage: React.FC = () => {
  const { user, logOut } = useAuth()

  const handleSignOut = async (): Promise<void> => {
    if (!user) return
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="bg-white">
      {user ? (
        <button onClick={handleSignOut}>Logout</button>
      ) : (
        <h1>Not logged in</h1>
      )}
    </div>
  )
}

export default LandingPage

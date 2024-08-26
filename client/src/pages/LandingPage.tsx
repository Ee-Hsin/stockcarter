import React from 'react'
import { Link } from 'react-router-dom'
import { FlipWords } from '../@/components/ui/flip-words'
import { useAuth } from '../hooks/useAuth'

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const words = ['profitably', 'strategically', 'confidently']

  return (
    <div className="flex flex-col justify-center px-8 md:px-4 bg-customSecondary w-screen h-screen">
      <div className="text-3xl md:text-4xl mx-auto font-normal text-neutral-400">
        {'invest '}
        <FlipWords words={words} /> <br />
        with the power of stockcarter.
      </div>
      <div className="mt-5 mx-auto">
        {isAuthenticated ? (
          <Link to="/dashboard">
            <button className="w-40 h-10 rounded-xl bg-white hover:bg-opacity-95 text-black border border-black text-sm">
              enter app
            </button>
          </Link>
        ) : (
          <>
            <Link to="/signin">
              <button className="mr-2 my-2 md:my-0 w-40 h-10 rounded-xl bg-black hover:bg-gray-900 hover:bg-opacity-30 border border-white text-white text-sm">
                login
              </button>
            </Link>
            <Link to="/signup">
              <button className="w-40 h-10 rounded-xl bg-white hover:bg-opacity-95 text-black border border-black text-sm">
                signup
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default LandingPage

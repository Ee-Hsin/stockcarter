import React from 'react'
import { Link } from 'react-router-dom'
import { FlipWords } from '../@/components/ui/flip-words'

const LandingPage: React.FC = () => {
  const words = ['profitably', 'strategically', 'confidently']

  return (
    <div className="flex flex-col justify-center px-8 md:px-4 bg-customSecondary w-screen h-screen">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        invest
        <FlipWords words={words} /> <br />
        with the power of stockcarter.
      </div>
      <div className="mt-10 mx-auto">
        <Link to="/signin">
          <button className="mr-2 my-2 md:my-0 w-40 h-10 rounded-xl bg-black border border-white text-white text-sm">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
            Signup
          </button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage

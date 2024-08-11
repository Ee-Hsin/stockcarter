import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-400 bg-customSecondary">
      <div className="flex flex-col items-center justify-center bg-gray-800 bg-opacity-60 p-10 rounded-3xl ">
        <h1 className="text-xl font-bold text-gray-200 mb-2">
          404 Page Not Found
        </h1>
        <p className="mb-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/" className="text-customLink hover:text-customLinkHover">
          Return Home
        </Link>
      </div>
    </div>
  )
}

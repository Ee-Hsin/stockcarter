import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <div className="flex flex-col items-center justify-center bg-gray-800 bg-opacity-80 p-10 rounded-xl ">
        <h1 className="text-xl font-bold text-indigo-500 mb-2">
          404 Page Not Found
        </h1>
        <p className="mb-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/" className="text-indigo-500 hover:text-indigo-600">
          Return Home
        </Link>
      </div>
    </div>
  )
}

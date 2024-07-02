// import { Link } from "react-router-dom"
import { useState } from 'react'

interface FailureModalProps {
  mainMessage?: string
  subMessage?: string
}

export const FailureModal: React.FC<FailureModalProps> = ({
  mainMessage = 'Error!',
  subMessage = 'Looks like something went wrong, you might want to try again ',
}) => {
  const [open, setOpen] = useState<boolean>(true)

  return open ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setOpen(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="mt-3">
            <div className="flex items-center justify-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="mt-2 text-center">
              <h4 className="text-lg font-medium text-gray-800">
                {mainMessage}
              </h4>
              <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                {subMessage}
              </p>
              {/* <Link to="/">Click here to Return to the Main Page</Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

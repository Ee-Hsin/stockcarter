import { useState } from 'react'
import { Link } from 'react-router-dom'

interface SuccessModalProps {
  mainMessage?: string
  subMessage?: string
  link?: string
  linkMessage?: string
  allowClose?: boolean
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  mainMessage = 'Success!',
  subMessage,
  link = '',
  linkMessage = 'Return Home',
  allowClose = true,
}) => {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    if (allowClose) {
      setOpen(false)
    }
  }

  return open ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={handleClose}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-customPrimary rounded-md shadow-lg">
          <div className="mt-3">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="mt-2 text-center">
              <h4 className="text-lg font-medium text-white">{mainMessage}</h4>
              <p className="mt-2 px-10 text-[15px] leading-relaxed text-gray-500">
                {subMessage}
              </p>
              <Link to={`/${link}`}>
                <button className="mt-4 px-4 py-2 rounded-full text-customLink hover:text-customLinkHover">
                  {linkMessage}{' '}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

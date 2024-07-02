interface LoaderProps {
  small?: boolean
  className?: string
}

export const Loader: React.FC<LoaderProps> = ({
  small = false,
  className = '',
}) => {
  return (
    <div className="flex w-full justify-center">
      <div
        className={`text-purple-600 inline-block ${
          small ? ' h-10 w-10 ' : ' h-32 w-32 '
        } animate-spin 
        rounded-full border-4 border-solid border-current 
        border-r-transparent align-[-0.125em] 
        motion-reduce:animate-[spin_1.5s_linear_infinite] ${className}`}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  )
}

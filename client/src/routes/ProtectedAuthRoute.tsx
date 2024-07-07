import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { FailureModal } from '../components/UI/FailureModal'
import { SuccessModal } from '../components/UI/SuccessModal'

interface ProtectedAuthRouteProps {
  children: React.ReactNode
}

export const ProtectedAuthRoute: React.FC<ProtectedAuthRouteProps> = ({
  children,
}) => {
  const { user, userDetails } = useAuth()

  if (!user) {
    return (
      <FailureModal
        mainMessage="Not Signed In!"
        subMessage="You must sign in to gain access to this page"
        linkMessage="Head to Sign In"
        link="signin"
        allowClose={false}
      />
    )
    // If they reach here, it means they've signed in but they're not onboarded
  } else if (!userDetails?.isOnboarded) {
    return (
      <SuccessModal
        mainMessage="Welcome to StockCarter!"
        subMessage="You're in! And we need you to complete our onboarding process!"
        link="onboarding"
        linkMessage="Head to Onboarding"
        allowClose={false}
      />
    )
  } else {
    return <>{children}</>
  }
}

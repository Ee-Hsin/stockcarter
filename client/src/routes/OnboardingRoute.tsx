import { Navigate } from 'react-router-dom'
import { FailureModal } from '../components/UI/FailureModal'
import { useAuth } from '../hooks/useAuth'
import OnboardingPage from '../pages/OnboardingPage'

export const OnboardingRoute: React.FC = () => {
  const { user, userDetails } = useAuth()

  if (!user) {
    return (
      <FailureModal
        mainMessage="not signed in!"
        subMessage="you must sign in to gain access to this page"
        linkMessage="head to sign In"
        link="signin"
        allowClose={false}
      />
    )
  } else if (userDetails?.isOnboarded) {
    return <Navigate to="/dashboard" />
  } else {
    return <OnboardingPage />
  }
}

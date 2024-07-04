import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import your components
import LandingPage from './pages/LandingPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuth } from './hooks/useAuth'
import { FailureModal } from './components/UI/FailureModal'
import { AuthContextProvider } from './hooks/AuthContext'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router>
          <div className="bg-black bg-opacity-99 w-screen h-screen">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedAuthRoute>
                    <DashboardPage />
                  </ProtectedAuthRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <ProtectedAuthRoute>
                    <TransactionsPage />
                  </ProtectedAuthRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

interface ProtectedAuthRouteProps {
  children: React.ReactNode
}
const ProtectedAuthRoute: React.FC<ProtectedAuthRouteProps> = ({
  children,
}) => {
  const { user } = useAuth()

  if (!user) {
    return (
      <FailureModal
        subMessage={'You must sign in to gain access to this page'}
      />
    )
  } else {
    return <>{children}</>
  }
}

export default App

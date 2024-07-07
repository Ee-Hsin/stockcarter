import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import your components
import LandingPage from './pages/LandingPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProtectedAuthRoute } from './routes/ProtectedAuthRoute'
import { OnboardingRoute } from './routes/OnboardingRoute'
import { PublicRoute } from './routes/PublicRoute'
import { AuthContextProvider } from './hooks/AuthContext'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router>
          <div className="bg-black bg-opacity-99 w-screen h-screen">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/signin"
                element={
                  <PublicRoute>
                    <SignInPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <SignUpPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/forgotpassword"
                element={
                  <PublicRoute>
                    <ForgotPasswordPage />
                  </PublicRoute>
                }
              />
              <Route path="onboarding" element={<OnboardingRoute />} />
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
              {/* Catch-all route */}
              <Route path="*" element={<NotFoundPage />} />{' '}
            </Routes>
          </div>
        </Router>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default App

import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { FailureModal } from '../components/UI/FailureModal'
import { SuccessModal } from '../components/UI/SuccessModal'
import { Sidebar, SidebarBody, SidebarLink } from '../@/components/ui/sidebar'
import { Link } from 'react-router-dom'
import {
  IconDashboard,
  IconExchange,
  IconSettings,
  IconUser,
} from '@tabler/icons-react'
import { motion } from 'framer-motion'

interface ProtectedAuthRouteProps {
  children: React.ReactNode
}

const links = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <IconDashboard
        size={20}
        className="text-neutral-200 h-5 w-5 flex-shrink-0"
      />
    ), // Adjust the icon size if needed
  },
  {
    label: 'Transactions',
    href: '/transactions',
    icon: (
      <IconExchange
        size={20}
        className="text-neutral-200 h-5 w-5 flex-shrink-0"
      />
    ),
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: (
      <IconUser size={20} className="text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: (
      <IconSettings
        size={20}
        className="text-neutral-200 h-5 w-5 flex-shrink-0"
      />
    ),
  },
]

export const ProtectedAuthRoute: React.FC<ProtectedAuthRouteProps> = ({
  children,
}) => {
  const { user, userDetails } = useAuth()
  const [open, setOpen] = useState<boolean>(false)

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
    return (
      <div className="flex flex-col md:flex-row bg-customSecondary w-screen h-screen">
        {/* Sidebar Component */}
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="w-screen h-screen justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: userDetails.name || 'User',
                  href: '#',
                  icon: (
                    <img
                      src="https://assets.aceternity.com/manu.png"
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>

        {/* Main Content */}
        <div className="w-screen h-screen">{children}</div>
      </div>
    )
  }
}

export const Logo = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        stockcarter
      </motion.span>
    </Link>
  )
}
export const LogoIcon = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  )
}

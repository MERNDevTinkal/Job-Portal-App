'use client'

import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { verifyLogin } from "../redux/features/auth/authSlice"
import { usePathname } from 'next/navigation'

export function AppProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    store.dispatch(verifyLogin())
  }, [pathname])

  return <Provider store={store}>{children}</Provider>
}

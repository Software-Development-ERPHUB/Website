import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { cms } from './api'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cms('/auth/me').then((d) => setUser(d.user)).catch(() => setUser(null)).finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const d = await cms('/auth/login', { method: 'POST', body: { email, password } })
    setUser(d.user)
    return d.user
  }, [])

  const logout = useCallback(async () => {
    await cms('/auth/logout', { method: 'POST' }).catch(() => {})
    setUser(null)
  }, [])

  return <AuthCtx.Provider value={{ user, loading, login, logout, setUser }}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx)

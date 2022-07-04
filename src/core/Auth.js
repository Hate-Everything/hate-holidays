import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getToken, removeToken, setToken } from '../helpers/auth'
import authAccess from '../model/authAccess'

export const AuthContext = React.createContext()

export function AuthProvider({ children }) {
  const [loading, setLoading] = React.useState(false)
  const [user, setUser] = React.useState()

  const getProfile = async (token) => {
    try {
      const { data } = await authAccess.getProfile(token)
      return data
    } catch (error) {
      removeToken()
    }
  }

  useEffect(() => {
    const token = getToken()
    const _getProfile = async () => {
      setLoading(true)
      const data = await getProfile(token)
      setUser(data)
      setLoading(false)
    }
    if (token) {
      _getProfile()
    }
  }, [])

  const logout = (callback) => {
    setLoading(true)
    removeToken()
    setUser(null)
    callback()
    setLoading(false)
  }

  const login = async (code, callback) => {
    setLoading(true)
    const { data } = await authAccess.login(code)
    if (data && data.access_token) {
      setToken(data.access_token)
      const userData = await getProfile(data.access_token)
      if (userData) {
        setUser(userData)
        callback()
      }
      setLoading(false)
    } else {
      window.location.href = '/'
    }
  }

  const value = { user, loading, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function RequireAuth({ children }) {
  const location = useLocation()
  if (!localStorage.getItem(process.env.REACT_APP_TOKEN_KEY)) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

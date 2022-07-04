import React from 'react'
import { Routes as Router, Route, HashRouter } from 'react-router-dom'
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import { AuthProvider, RequireAuth } from './Auth'
import Layout from './Layout'

export default function Routes() {
  console.log('node env =', process.env.REACT_APP_NODE_ENV)
  console.log('baseurl =', process.env.REACT_APP_BASE_URL)
  return (
    <AuthProvider>
      <HashRouter basename={process.env.REACT_APP_BASE_URL}>
        <Router>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="*" element={<div>No Match</div>} />
        </Router>
      </HashRouter>
    </AuthProvider>
  )
}

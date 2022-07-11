import React from 'react'
import { BrowserRouter, Routes as Router, Route } from 'react-router-dom'
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Team from '../components/pages/Team'
import { AuthProvider, RequireAuth } from './Auth'
import Layout from './Layout'

export default function Routes() {
  return (
    <AuthProvider>
      <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
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
            <Route
              path="/team"
              element={
                <RequireAuth>
                  <Team />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="*" element={<div>No Match</div>} />
        </Router>
      </BrowserRouter>
    </AuthProvider>
  )
}

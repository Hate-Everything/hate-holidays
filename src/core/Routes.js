import React from 'react'
import { BrowserRouter, Routes as Router, Route } from 'react-router-dom'
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import { AuthProvider, RequireAuth } from './Auth'
import Layout from './Layout'

export default function Routes() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/">
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
        </Router>
      </BrowserRouter>
    </AuthProvider>
  )
}

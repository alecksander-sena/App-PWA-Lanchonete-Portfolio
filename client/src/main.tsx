import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import './index.css'

// Componente para proteger rota /admin
function RequireAuth({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
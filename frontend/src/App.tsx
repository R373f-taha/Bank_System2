
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './assets/components/LogIn/LogIn'
import Register from './assets/components/Register/Register'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import Landing from './pages/Landing'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

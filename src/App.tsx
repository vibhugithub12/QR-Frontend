import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GenerateQR from './pages/GenerateQR'
import ScanQR from './pages/ScanQR'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GenerateQR />} />
        <Route path="/scan/:id" element={<ScanQR />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil'
import Reservation from './pages/Reservation'
import Suivi from './pages/Suivi'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/suivi" element={<Suivi />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
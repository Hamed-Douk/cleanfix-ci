import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil'
import Reservation from './pages/Reservation'
import Suivi from './pages/Suivi'

function PageSimple({ titre }) {
  return (
    <div style={{
      maxWidth: '390px', margin: '0 auto',
      minHeight: '100vh', backgroundColor: '#F4F7FC',
      fontFamily: 'Arial, sans-serif', display: 'flex',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <h2 style={{ color: '#1B4F8A' }}>{titre} — Bientôt disponible 🚀</h2>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/suivi" element={<Suivi />} />
        <Route path="/abonnement" element={<PageSimple titre="Abonnements" />} />
        <Route path="/profil" element={<PageSimple titre="Mon Profil" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
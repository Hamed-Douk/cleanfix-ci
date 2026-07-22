import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Accueil from './pages/Accueil'
import Reservation from './pages/Reservation'
import Suivi from './pages/Suivi'
import Inscription from './pages/Inscription'
import Connexion from './pages/Connexion'
import Admin from './pages/Admin'
import Profil from './pages/Profil'
import Notation from './pages/Notation'


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

function RoutePriotegee({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/connexion" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={
          <RoutePriotegee><Accueil /></RoutePriotegee>
        } />
        <Route path="/reservation" element={
          <RoutePriotegee><Reservation /></RoutePriotegee>
        } />
        <Route path="/suivi" element={
          <RoutePriotegee><Suivi /></RoutePriotegee>
        } />
        <Route path="/abonnement" element={
          <RoutePriotegee><PageSimple titre="Abonnements" /></RoutePriotegee>
        } />
       <Route path="/profil" element={
  <RoutePriotegee><Profil /></RoutePriotegee>
} />
      </Routes>
      <Route path="/notation" element={
  <RoutePriotegee><Notation /></RoutePriotegee>
} />
    </BrowserRouter>
  )
}

export default App
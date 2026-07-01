import { useNavigate, useLocation } from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const onglets = [
    { path: '/', emoji: '🏠', label: 'Accueil' },
    { path: '/reservation', emoji: '📋', label: 'Réservations' },
    { path: '/abonnement', emoji: '💳', label: 'Abonnement' },
    { path: '/profil', emoji: '👤', label: 'Profil' },
  ]

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      width: '390px',
      backgroundColor: 'white',
      borderTop: '1px solid #E0E0E0',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '10px 0'
    }}>
      {onglets.map((o) => (
        <div
          key={o.path}
          onClick={() => navigate(o.path)}
          style={{ textAlign: 'center', cursor: 'pointer' }}
        >
          <div style={{ fontSize: '22px' }}>{o.emoji}</div>
          <p style={{
            margin: 0,
            fontSize: '10px',
            color: location.pathname === o.path ? '#1B4F8A' : '#888',
            fontWeight: location.pathname === o.path ? 'bold' : 'normal'
          }}>
            {o.label}
          </p>
        </div>
      ))}
    </div>
  )
}

export default NavBar
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'

function Suivi() {
  const navigate = useNavigate()
  const [eta, setEta] = useState(12)
  const [statut, setStatut] = useState('en_route') // acceptée → en_route → arrivé → en_cours → terminé
  const [pulse, setPulse] = useState(true)

  // Décompte ETA
  useEffect(() => {
    if (eta <= 0) return
    const timer = setInterval(() => {
      setEta(prev => {
        if (prev <= 1) {
          setStatut('arrivé')
          return 0
        }
        return prev - 1
      })
    }, 3000) // toutes les 3 secondes pour la démo
    return () => clearInterval(timer)
  }, [])

  // Animation pulse
  useEffect(() => {
    const timer = setInterval(() => setPulse(p => !p), 1000)
    return () => clearInterval(timer)
  }, [])

  const statuts = [
    { key: 'acceptée', label: '✅ Acceptée', done: true },
    { key: 'en_route', label: '🔵 En route', done: statut === 'en_route' || statut === 'arrivé' },
    { key: 'arrivé', label: '📍 Arrivé', done: statut === 'arrivé' },
  ]

  return (
    <div style={{
      maxWidth: '390px', margin: '0 auto',
      minHeight: '100vh', backgroundColor: '#F4F7FC',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ backgroundColor: '#1B4F8A', padding: '20px', paddingTop: '50px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '18px' }}>📍 Suivi de votre lavage</h1>
      </div>

      {/* Carte simulée animée */}
      <div style={{
        backgroundColor: '#C8DEB5', height: '220px',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Routes simulées */}
        <div style={{
          position: 'absolute', top: '50%', left: '10%', right: '10%',
          height: '2px', backgroundColor: '#888', opacity: 0.4
        }} />
        <div style={{
          position: 'absolute', top: '30%', left: '20%', right: '20%',
          height: '2px', backgroundColor: '#888', opacity: 0.3, transform: 'rotate(15deg)'
        }} />

        {/* Labels quartiers */}
        <div style={{
          position: 'absolute', top: '20px', left: '30px',
          backgroundColor: 'white', padding: '6px 12px',
          borderRadius: '8px', fontSize: '12px', fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>Abobo</div>

        <div style={{
          position: 'absolute', top: '20px', right: '30px',
          backgroundColor: 'white', padding: '6px 12px',
          borderRadius: '8px', fontSize: '12px', fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>Cocody</div>

        {/* Position client */}
        <div style={{
          position: 'absolute', bottom: '30px', right: '40px',
          backgroundColor: '#22AA44', borderRadius: '50%',
          width: '16px', height: '16px',
          border: '3px solid white',
          boxShadow: '0 0 0 4px rgba(34,170,68,0.3)'
        }} />

        {/* Voiture du prestataire animée */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: eta > 0 ? `${20 + (12 - eta) * 5}%` : '60%',
          transform: 'translateY(-50%)',
          transition: 'left 2s ease-in-out',
          backgroundColor: '#1B4F8A',
          borderRadius: '50%',
          width: '44px', height: '44px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px',
          boxShadow: pulse ? '0 0 0 8px rgba(27,79,138,0.3)' : '0 0 0 4px rgba(27,79,138,0.1)',
          transition: 'left 2s ease-in-out, box-shadow 0.5s'
        }}>🚗</div>
      </div>

      <div style={{ padding: '20px', paddingBottom: '80px' }}>

        {/* Message de confirmation */}
        <div style={{
          backgroundColor: '#E8F5E9', border: '1px solid #22AA44',
          borderRadius: '12px', padding: '15px', marginBottom: '15px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#22AA44', fontWeight: 'bold', margin: 0, fontSize: '16px' }}>
            ✅ Réservation confirmée !
          </p>
          <p style={{ color: '#555', margin: '5px 0 0', fontSize: '13px' }}>
            Votre prestataire est en route vers vous
          </p>
        </div>

        {/* Info prestataire */}
        <div style={{
          backgroundColor: 'white', borderRadius: '12px',
          padding: '15px', marginBottom: '15px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <p style={{ color: '#888', margin: '0 0 4px', fontSize: '13px' }}>Votre prestataire</p>
          <p style={{ color: '#1B4F8A', fontWeight: 'bold', margin: '0 0 4px', fontSize: '18px' }}>
            Kouassi Bernard
          </p>
          <p style={{ color: '#888', margin: 0, fontSize: '13px' }}>⭐ 4,8 · 127 avis</p>
        </div>

        {/* Barre de statuts */}
        <div style={{
          backgroundColor: 'white', borderRadius: '10px',
          padding: '15px', marginBottom: '15px',
          display: 'flex', justifyContent: 'space-around',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          {statuts.map((s) => (
            <span key={s.key} style={{
              color: s.done ? '#1B4F8A' : '#CCC',
              fontWeight: s.done ? 'bold' : 'normal',
              fontSize: '13px'
            }}>
              {s.label}
            </span>
          ))}
        </div>

        {/* ETA */}
        <div style={{
          backgroundColor: '#1B4F8A', borderRadius: '12px',
          padding: '15px', textAlign: 'center', marginBottom: '15px'
        }}>
          {eta > 0 ? (
            <>
              <p style={{ color: 'white', margin: '0 0 4px', fontSize: '13px' }}>Arrivée estimée</p>
              <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '28px' }}>
                ⏱ {eta} minute{eta > 1 ? 's' : ''}
              </p>
            </>
          ) : (
            <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '20px' }}>
              📍 Votre prestataire est arrivé !
            </p>
          )}
        </div>

        {/* Bouton chat */}
        <button style={{
          width: '100%', padding: '15px',
          backgroundColor: 'white', color: '#1B4F8A',
          border: '2px solid #1B4F8A', borderRadius: '12px',
          fontSize: '15px', fontWeight: 'bold', cursor: 'pointer',
          marginBottom: '10px'
        }}>
          💬 Contacter le prestataire
        </button>

        {/* Retour accueil */}
        <button onClick={() => navigate('/')} style={{
          width: '100%', padding: '12px',
          backgroundColor: 'transparent', color: '#888',
          border: '1px solid #CCC', borderRadius: '12px',
          fontSize: '14px', cursor: 'pointer'
        }}>
          ← Retour à l'accueil
        </button>
      </div>

      <NavBar />
    </div>
  )
}

export default Suivi
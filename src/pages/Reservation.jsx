import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

function Reservation() {
  const navigate = useNavigate()

  const prestations = [
    { emoji: '🚿', titre: 'Lavage extérieur', prix: '3 000 FCFA' },
    { emoji: '🪑', titre: 'Sièges & Intérieur', prix: '6 000 FCFA' },
    { emoji: '✨', titre: 'Polissage', prix: '20 000 FCFA' },
    { emoji: '🌿', titre: 'Éco sans eau', prix: '4 000 FCFA' },
  ]

  return (
    <div style={{
      maxWidth: '390px',
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#F4F7FC',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#1B4F8A',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span
          onClick={() => navigate('/')}
          style={{ color: 'white', cursor: 'pointer', fontSize: '20px' }}>
          ←
        </span>
        <h1 style={{ color: 'white', margin: 0, fontSize: '18px' }}>
          Réserver un service
        </h1>
      </div>

      <div style={{ padding: '20px' }}>
        <p style={{ color: '#1B4F8A', fontWeight: 'bold', marginBottom: '10px' }}>
          Choisissez votre prestation
        </p>

        {prestations.map((p, index) => (
          <div key={index} style={{
            backgroundColor: index === 0 ? '#E8F0FB' : 'white',
            border: index === 0 ? '2px solid #1B4F8A' : '1px solid #eee',
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <span>{p.emoji} {p.titre}</span>
            <span style={{ color: '#1B4F8A', fontWeight: 'bold' }}>{p.prix}</span>
          </div>
        ))}

        <p style={{ color: '#1B4F8A', fontWeight: 'bold', margin: '20px 0 8px' }}>
          📍 Adresse d'intervention
        </p>
        <input
          placeholder="Ex: Cocody, Rue des Jardins..."
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '10px',
            border: '1px solid #CCC',
            backgroundColor: '#F4F7FC',
            fontSize: '14px',
            boxSizing: 'border-box',
            marginBottom: '15px'
          }}
        />

        <p style={{ color: '#1B4F8A', fontWeight: 'bold', margin: '0 0 8px' }}>
          📅 Date et heure
        </p>
        <input
          defaultValue="Aujourd'hui — 14h00"
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '10px',
            border: '1px solid #CCC',
            backgroundColor: 'white',
            fontSize: '14px',
            boxSizing: 'border-box',
            marginBottom: '20px'
          }}
        />

        <button
          onClick={() => navigate('/suivi')}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#1B4F8A',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
          ✅ Confirmer la réservation
        </button>
      </div>
    </div>
  )
}

export default Reservation
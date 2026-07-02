import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

function Reservation() {
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [adresse, setAdresse] = useState('')
  const [loading, setLoading] = useState(false)

  const prestations = [
    { emoji: '🚿', titre: 'Lavage extérieur', prix: '3 000 FCFA' },
    { emoji: '🪑', titre: 'Sièges & Intérieur', prix: '6 000 FCFA' },
    { emoji: '✨', titre: 'Polissage', prix: '20 000 FCFA' },
    { emoji: '🌿', titre: 'Éco sans eau', prix: '4 000 FCFA' },
  ]

  const confirmer = async () => {
    if (!adresse) {
      alert('Veuillez entrer une adresse')
      return
    }
    setLoading(true)
    try {
      const response = await fetch('https://cleanfix-backend.onrender.com/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prestation: prestations[selectedIndex].titre,
          adresse,
          date: "Aujourd'hui"
        })
      })
      if (response.ok) {
        navigate('/suivi')
      }
    } catch (error) {
      // Si le backend est en veille, on navigue quand même
      navigate('/suivi')
    }
    setLoading(false)
  }

  return (
    <div style={{
      maxWidth: '390px', margin: '0 auto',
      minHeight: '100vh', backgroundColor: '#F4F7FC',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ backgroundColor: '#1B4F8A', padding: '20px', paddingTop: '50px' }}>
        <span onClick={() => navigate('/')} style={{ color: 'white', cursor: 'pointer', fontSize: '20px' }}>← </span>
        <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Réserver un service</span>
      </div>

      <div style={{ padding: '20px' }}>
        <p style={{ color: '#1B4F8A', fontWeight: 'bold', fontSize: '16px' }}>Choisissez votre prestation</p>

        {prestations.map((p, index) => (
          <div key={index}
            onClick={() => setSelectedIndex(index)}
            style={{
              backgroundColor: selectedIndex === index ? '#E8F0FB' : 'white',
              border: selectedIndex === index ? '2px solid #1B4F8A' : '1px solid #eee',
              borderRadius: '10px', padding: '15px', marginBottom: '10px',
              display: 'flex', justifyContent: 'space-between',
              cursor: 'pointer'
            }}>
            <span>{p.emoji} {p.titre}</span>
            <span style={{ color: '#1B4F8A', fontWeight: 'bold' }}>{p.prix}</span>
          </div>
        ))}

        <p style={{ color: '#1B4F8A', fontWeight: 'bold', marginTop: '20px' }}>📍 Adresse d'intervention</p>
        <input
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          placeholder="Ex: Cocody, Rue des Jardins..."
          style={{
            width: '100%', padding: '14px', borderRadius: '10px',
            border: '1px solid #CCC', fontSize: '14px',
            boxSizing: 'border-box', marginBottom: '15px'
          }}
        />

        <p style={{ color: '#1B4F8A', fontWeight: 'bold' }}>📅 Date et heure</p>
        <input
          defaultValue="Aujourd'hui — 14h00"
          style={{
            width: '100%', padding: '14px', borderRadius: '10px',
            border: '1px solid #CCC', fontSize: '14px',
            boxSizing: 'border-box', marginBottom: '20px'
          }}
        />

        <button
          onClick={confirmer}
          disabled={loading}
          style={{
            width: '100%', padding: '16px',
            backgroundColor: loading ? '#888' : '#1B4F8A',
            color: 'white', border: 'none', borderRadius: '12px',
            fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'
          }}>
          {loading ? '⏳ Envoi...' : '✅ Confirmer la réservation'}
        </button>
      </div>
    </div>
  )
}

export default Reservation
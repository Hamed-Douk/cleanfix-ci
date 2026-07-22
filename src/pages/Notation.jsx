import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function Notation() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const reservationId = searchParams.get('reservation_id') || 1
  const [note, setNote] = useState(0)
  const [commentaire, setCommentaire] = useState('')
  const [loading, setLoading] = useState(false)
  const [envoye, setEnvoye] = useState(false)

  const envoyerNotation = async () => {
    if (note === 0) {
      alert('Veuillez choisir une note')
      return
    }
    setLoading(true)
    try {
      await fetch('https://cleanfix-backend.onrender.com/api/notations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservation_id: reservationId, note, commentaire })
      })
      setEnvoye(true)
    } catch (err) {
      alert('Erreur lors de l\'envoi')
    }
    setLoading(false)
  }

  if (envoye) return (
    <div style={{
      maxWidth: '390px', margin: '0 auto',
      minHeight: '100vh', backgroundColor: '#F4F7FC',
      fontFamily: 'Arial, sans-serif', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', padding: '20px'
    }}>
      <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
      <h2 style={{ color: '#1B4F8A', textAlign: 'center' }}>
        Merci pour votre avis !
      </h2>
      <p style={{ color: '#666', textAlign: 'center' }}>
        Votre notation aide à améliorer la qualité du service AutoDat.
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '20px', padding: '14px 30px',
          backgroundColor: '#1B4F8A', color: 'white',
          border: 'none', borderRadius: '12px',
          fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'
        }}>
        Retour à l'accueil
      </button>
    </div>
  )

  return (
    <div style={{
      maxWidth: '390px', margin: '0 auto',
      minHeight: '100vh', backgroundColor: '#F4F7FC',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1B4F8A', padding: '20px',
        paddingTop: '50px', textAlign: 'center'
      }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '20px' }}>
          Évaluer le service
        </h1>
        <p style={{ color: '#B3D1F0', margin: '5px 0 0', fontSize: '13px' }}>
          Votre avis compte beaucoup
        </p>
      </div>

      <div style={{ padding: '30px 20px' }}>

        {/* Prestataire */}
        <div style={{
          backgroundColor: 'white', borderRadius: '12px',
          padding: '20px', textAlign: 'center',
          marginBottom: '25px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <div style={{ fontSize: '50px', marginBottom: '10px' }}>👨‍🔧</div>
          <p style={{ color: '#1B4F8A', fontWeight: 'bold', margin: 0, fontSize: '18px' }}>
            Kouassi Bernard
          </p>
          <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>
            Prestataire AutoDat
          </p>
        </div>

        {/* Étoiles */}
        <p style={{ color: '#1B4F8A', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>
          Comment s'est passé votre lavage ?
        </p>
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: '10px', marginBottom: '25px'
        }}>
          {[1, 2, 3, 4, 5].map((etoile) => (
            <span
              key={etoile}
              onClick={() => setNote(etoile)}
              style={{
                fontSize: '40px', cursor: 'pointer',
                opacity: etoile <= note ? 1 : 0.3,
                transition: 'opacity 0.2s'
              }}>
              ⭐
            </span>
          ))}
        </div>

        {note > 0 && (
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
            {note === 1 && 'Très mauvais 😞'}
            {note === 2 && 'Mauvais 😕'}
            {note === 3 && 'Correct 😐'}
            {note === 4 && 'Bien 😊'}
            {note === 5 && 'Excellent ! 🎉'}
          </p>
        )}

        {/* Commentaire */}
        <p style={{ color: '#1B4F8A', fontWeight: 'bold', marginBottom: '8px' }}>
          💬 Commentaire (optionnel)
        </p>
        <textarea
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
          placeholder="Partagez votre expérience..."
          rows={4}
          style={{
            width: '100%', padding: '14px',
            borderRadius: '10px', border: '1px solid #CCC',
            fontSize: '14px', boxSizing: 'border-box',
            resize: 'none', fontFamily: 'Arial, sans-serif',
            marginBottom: '25px'
          }}
        />

        <button
          onClick={envoyerNotation}
          disabled={loading || note === 0}
          style={{
            width: '100%', padding: '16px',
            backgroundColor: note === 0 ? '#CCC' : '#1B4F8A',
            color: 'white', border: 'none', borderRadius: '12px',
            fontSize: '16px', fontWeight: 'bold',
            cursor: note === 0 ? 'not-allowed' : 'pointer'
          }}>
          {loading ? '⏳ Envoi...' : '⭐ Envoyer ma notation'}
        </button>

      </div>
    </div>
  )
}

export default Notation
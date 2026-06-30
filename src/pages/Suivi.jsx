import { useNavigate } from 'react-router-dom'

function Suivi() {
  const navigate = useNavigate()

  return (
    <div style={{
      maxWidth: '390px',
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#F4F7FC',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1B4F8A',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '18px' }}>
          📍 Suivi de votre lavage
        </h1>
      </div>

      {/* Carte simulée */}
      <div style={{
        backgroundColor: '#C8DEB5',
        height: '250px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'absolute', top: '30px', left: '60px',
          backgroundColor: 'white', padding: '6px 12px',
          borderRadius: '8px', fontSize: '12px', fontWeight: 'bold'
        }}>Cocody</div>
        <div style={{
          position: 'absolute', top: '30px', right: '60px',
          backgroundColor: 'white', padding: '6px 12px',
          borderRadius: '8px', fontSize: '12px', fontWeight: 'bold'
        }}>Plateau</div>
        <div style={{
          backgroundColor: '#1B4F8A',
          borderRadius: '50%',
          width: '40px', height: '40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px'
        }}>🚗</div>
      </div>

      <div style={{ padding: '20px' }}>

        {/* Info prestataire */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '15px',
          marginBottom: '15px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <p style={{ color: '#888', margin: '0 0 4px', fontSize: '13px' }}>
            Votre prestataire
          </p>
          <p style={{ color: '#1B4F8A', fontWeight: 'bold', margin: '0 0 4px', fontSize: '18px' }}>
            Kouassi Bernard
          </p>
          <p style={{ color: '#888', margin: 0, fontSize: '13px' }}>
            ⭐ 4,8 · 127 avis
          </p>
        </div>

        {/* Statuts */}
        <div style={{
          backgroundColor: '#F4F7FC',
          borderRadius: '10px',
          padding: '15px',
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '15px'
        }}>
          <span style={{ color: '#22AA44', fontWeight: 'bold', fontSize: '13px' }}>✅ Acceptée</span>
          <span style={{ color: '#1B4F8A', fontWeight: 'bold', fontSize: '13px' }}>🔵 En route</span>
          <span style={{ color: '#CCC', fontSize: '13px' }}>⬜ Arrivé</span>
        </div>

        {/* ETA */}
        <div style={{
          backgroundColor: '#1B4F8A',
          borderRadius: '12px',
          padding: '15px',
          textAlign: 'center',
          marginBottom: '15px'
        }}>
          <p style={{ color: 'white', margin: '0 0 4px', fontSize: '13px' }}>
            Arrivée estimée
          </p>
          <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '24px' }}>
            ⏱ 12 minutes
          </p>
        </div>

        {/* Bouton chat */}
        <button style={{
          width: '100%',
          padding: '15px',
          backgroundColor: 'white',
          color: '#1B4F8A',
          border: '2px solid #1B4F8A',
          borderRadius: '12px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '15px'
        }}>
          💬 Contacter le prestataire
        </button>

        {/* Retour accueil */}
        <button
          onClick={() => navigate('/')}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: 'transparent',
            color: '#888',
            border: '1px solid #CCC',
            borderRadius: '12px',
            fontSize: '14px',
            cursor: 'pointer'
          }}>
          ← Retour à l'accueil
        </button>

      </div>
    </div>
  )
}

export default Suivi
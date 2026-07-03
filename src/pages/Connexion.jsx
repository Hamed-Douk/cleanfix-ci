import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Connexion() {
  const navigate = useNavigate()
  const [telephone, setTelephone] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')

  const connecter = async () => {
    if (!telephone || !motDePasse) {
      setErreur('Tous les champs sont obligatoires')
      return
    }
    setLoading(true)
    setErreur('')
    try {
      const response = await fetch('https://cleanfix-backend.onrender.com/api/connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telephone, mot_de_passe: motDePasse })
      })
      const data = await response.json()
      if (!response.ok) {
        setErreur(data.erreur || 'Erreur de connexion')
      } else {
        localStorage.setItem('token', data.token)
        localStorage.setItem('utilisateur', JSON.stringify(data.utilisateur))
        navigate('/')
      }
    } catch (err) {
      setErreur('Impossible de contacter le serveur')
    }
    setLoading(false)
  }

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
        <h1 style={{ color: 'white', margin: 0, fontSize: '22px' }}>CleanFix CI</h1>
        <p style={{ color: '#B3D1F0', margin: '5px 0 0', fontSize: '14px' }}>
          Connectez-vous à votre compte
        </p>
      </div>

      <div style={{ padding: '30px 20px' }}>

        {erreur && (
          <div style={{
            backgroundColor: '#FFEBEE', border: '1px solid #FF5252',
            borderRadius: '10px', padding: '12px', marginBottom: '15px',
            color: '#D32F2F', fontSize: '14px', textAlign: 'center'
          }}>
            ⚠️ {erreur}
          </div>
        )}

        <p style={{ color: '#1B4F8A', fontWeight: 'bold', marginBottom: '8px' }}>
          📱 Numéro de téléphone
        </p>
        <input
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder="Ex: 0707000000"
          type="tel"
          style={{
            width: '100%', padding: '14px', borderRadius: '10px',
            border: '1px solid #CCC', fontSize: '14px',
            boxSizing: 'border-box', marginBottom: '20px'
          }}
        />

        <p style={{ color: '#1B4F8A', fontWeight: 'bold', marginBottom: '8px' }}>
          🔒 Mot de passe
        </p>
        <input
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          placeholder="Votre mot de passe"
          type="password"
          style={{
            width: '100%', padding: '14px', borderRadius: '10px',
            border: '1px solid #CCC', fontSize: '14px',
            boxSizing: 'border-box', marginBottom: '30px'
          }}
        />

        <button
          onClick={connecter}
          disabled={loading}
          style={{
            width: '100%', padding: '16px',
            backgroundColor: loading ? '#888' : '#1B4F8A',
            color: 'white', border: 'none', borderRadius: '12px',
            fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
            marginBottom: '15px'
          }}>
          {loading ? '⏳ Connexion...' : '🔑 Se connecter'}
        </button>

        <p style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
          Pas encore de compte ?{' '}
          <span
            onClick={() => navigate('/inscription')}
            style={{ color: '#1B4F8A', fontWeight: 'bold', cursor: 'pointer' }}>
            S'inscrire
          </span>
        </p>

      </div>
    </div>
  )
}

export default Connexion
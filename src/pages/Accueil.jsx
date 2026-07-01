import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import CartePrestation from '../components/CartePrestation'

function Accueil() {
  const navigate = useNavigate()
  const [prestations, setPrestations] = useState([])

  useEffect(() => {
   fetch('https://cleanfix-backend.onrender.com/api/prestations')
      .then(res => res.json())
      .then(data => setPrestations(data))
      .catch(err => console.log('Erreur:', err))
  }, [])

  return (
    <div style={{
      maxWidth: '390px',
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: '#F4F7FC',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Header />

      <div style={{ padding: '20px' }}>
        <h2 style={{ color: '#1B4F8A', margin: '0 0 5px 0' }}>
          Bonjour Khalil 👋
        </h2>
        <p style={{ color: '#666', margin: '0 0 20px 0' }}>
          Quel service souhaitez-vous aujourd'hui ?
        </p>

        <button
          onClick={() => navigate('/reservation')}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#1B4F8A',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '20px'
          }}>
          🚗 Réserver maintenant
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '15px',
          paddingBottom: '80px'
        }}>
          {prestations.map((p) => (
            <CartePrestation
              key={p.id}
              emoji={p.emoji}
              titre={p.titre}
              prix={`Dès ${p.prix.toLocaleString()} FCFA`}
            />
          ))}
        </div>
      </div>

      <NavBar />
    </div>
  )
}

export default Accueil
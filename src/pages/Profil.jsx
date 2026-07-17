import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'

function Profil() {
  const navigate = useNavigate()
  const utilisateur = JSON.parse(localStorage.getItem('utilisateur') || '{}')
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  if (!utilisateur.id) return

  fetch(`https://cleanfix-backend.onrender.com/api/reservations/user/${utilisateur.id}`)
    .then(res => res.json())
    .then(data => {
      setReservations(data)
      setLoading(false)
    })
    .catch(() => {
      setLoading(false)
    })
}, [utilisateur.id])

  const seDeconnecter = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('utilisateur')
    navigate('/connexion')
  }

  return (
    <div style={{
      maxWidth: '390px', margin: '0 auto',
      minHeight: '100vh', backgroundColor: '#F4F7FC',
      fontFamily: 'Arial, sans-serif', paddingBottom: '80px'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1B4F8A', padding: '20px',
        paddingTop: '50px', textAlign: 'center'
      }}>
        <div style={{
          width: '70px', height: '70px', borderRadius: '50%',
          backgroundColor: 'white', margin: '0 auto 10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '30px'
        }}>
          👤
        </div>
        <h1 style={{ color: 'white', margin: 0, fontSize: '20px' }}>
          {utilisateur.nom || 'Utilisateur'}
        </h1>
        <p style={{ color: '#B3D1F0', margin: '4px 0 0', fontSize: '13px' }}>
          📱 {utilisateur.telephone || ''}
        </p>
      </div>

      <div style={{ padding: '20px' }}>

        {/* Statistiques */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '12px', marginBottom: '20px'
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '12px',
            padding: '15px', textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <p style={{ color: '#888', margin: '0 0 5px', fontSize: '12px' }}>
              Total réservations
            </p>
            <p style={{ color: '#1B4F8A', fontWeight: 'bold', margin: 0, fontSize: '28px' }}>
              {reservations.length}
            </p>
          </div>
          <div style={{
            backgroundColor: 'white', borderRadius: '12px',
            padding: '15px', textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <p style={{ color: '#888', margin: '0 0 5px', fontSize: '12px' }}>
              Dernière réservation
            </p>
            <p style={{ color: '#1B4F8A', fontWeight: 'bold', margin: 0, fontSize: '13px' }}>
              {reservations.length > 0
                ? new Date(reservations[0].created_at).toLocaleDateString('fr-FR')
                : '—'}
            </p>
          </div>
        </div>

        {/* Historique */}
        <h2 style={{ color: '#1B4F8A', fontSize: '16px', marginBottom: '12px' }}>
          📋 Mes réservations
        </h2>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#888' }}>⏳ Chargement...</p>
        ) : reservations.length === 0 ? (
          <div style={{
            backgroundColor: 'white', borderRadius: '12px',
            padding: '30px', textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <p style={{ color: '#888', margin: 0 }}>Aucune réservation pour le moment</p>
            <button
              onClick={() => navigate('/reservation')}
              style={{
                marginTop: '15px', padding: '12px 24px',
                backgroundColor: '#1B4F8A', color: 'white',
                border: 'none', borderRadius: '10px',
                cursor: 'pointer', fontWeight: 'bold'
              }}>
              Faire une réservation
            </button>
          </div>
        ) : (
          reservations.map((r) => (
            <div key={r.id} style={{
              backgroundColor: 'white', borderRadius: '12px',
              padding: '15px', marginBottom: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ color: '#1B4F8A', fontWeight: 'bold', margin: 0, fontSize: '15px' }}>
                  {r.prestation}
                </p>
                <span style={{
                  backgroundColor: '#E8F5E9', color: '#22AA44',
                  padding: '3px 10px', borderRadius: '20px',
                  fontSize: '11px', fontWeight: 'bold'
                }}>
                  {r.statut}
                </span>
              </div>
              <p style={{ color: '#666', margin: '6px 0 4px', fontSize: '13px' }}>
                📍 {r.adresse}
              </p>
              <p style={{ color: '#888', margin: 0, fontSize: '12px' }}>
                🕐 {new Date(r.created_at).toLocaleDateString('fr-FR', {
                  day: '2-digit', month: 'long', year: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>
          ))
        )}

        {/* Bouton déconnexion */}
        <button
          onClick={seDeconnecter}
          style={{
            width: '100%', padding: '14px',
            backgroundColor: 'white', color: '#D32F2F',
            border: '2px solid #D32F2F', borderRadius: '12px',
            fontSize: '15px', fontWeight: 'bold', cursor: 'pointer',
            marginTop: '20px'
          }}>
          🚪 Se déconnecter
        </button>

      </div>
      <NavBar />
    </div>
  )
}

export default Profil
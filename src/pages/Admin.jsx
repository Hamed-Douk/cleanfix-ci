import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://cleanfix-backend.onrender.com/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', height: '100vh',
      backgroundColor: '#F4F7FC'
    }}>
      <p style={{ color: '#1B4F8A', fontSize: '18px' }}>⏳ Chargement...</p>
    </div>
  )

  return (
    <div style={{
      maxWidth: '900px', margin: '0 auto',
      minHeight: '100vh', backgroundColor: '#F4F7FC',
      fontFamily: 'Arial, sans-serif'
    }}>

      {/* Header */}
      <div style={{
        backgroundColor: '#1B4F8A', padding: '20px 30px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ color: 'white', margin: 0, fontSize: '22px' }}>
            AutoDat — Admin
          </h1>
          <p style={{ color: '#B3D1F0', margin: '4px 0 0', fontSize: '13px' }}>
            Tableau de bord
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: 'transparent', color: 'white',
            border: '1px solid white', borderRadius: '8px',
            padding: '8px 16px', cursor: 'pointer', fontSize: '13px'
          }}>
          ← Retour
        </button>
      </div>

      <div style={{ padding: '25px' }}>

        {/* Statistiques */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: '15px', marginBottom: '25px'
        }}>
          <div style={{
            backgroundColor: '#1B4F8A', borderRadius: '12px',
            padding: '20px', textAlign: 'center'
          }}>
            <p style={{ color: '#B3D1F0', margin: '0 0 8px', fontSize: '13px' }}>
              Total Réservations
            </p>
            <p style={{ color: 'white', margin: 0, fontSize: '36px', fontWeight: 'bold' }}>
              {stats?.total_reservations || 0}
            </p>
          </div>

          <div style={{
            backgroundColor: '#22AA44', borderRadius: '12px',
            padding: '20px', textAlign: 'center'
          }}>
            <p style={{ color: '#B3F0C4', margin: '0 0 8px', fontSize: '13px' }}>
              Aujourd'hui
            </p>
            <p style={{ color: 'white', margin: 0, fontSize: '36px', fontWeight: 'bold' }}>
              {stats?.reservations_aujourdhui || 0}
            </p>
          </div>

          <div style={{
            backgroundColor: '#F57C00', borderRadius: '12px',
            padding: '20px', textAlign: 'center'
          }}>
            <p style={{ color: '#FFE0B2', margin: '0 0 8px', fontSize: '13px' }}>
              Utilisateurs
            </p>
            <p style={{ color: 'white', margin: 0, fontSize: '36px', fontWeight: 'bold' }}>
              {stats?.total_utilisateurs || 0}
            </p>
          </div>
        </div>

        {/* Liste des réservations */}
        <div style={{
          backgroundColor: 'white', borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden'
        }}>
          <div style={{
            backgroundColor: '#1B4F8A', padding: '15px 20px'
          }}>
            <h2 style={{ color: 'white', margin: 0, fontSize: '16px' }}>
              📋 Dernières réservations
            </h2>
          </div>

          {stats?.dernieres_reservations?.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#888' }}>
              Aucune réservation pour le moment
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#F4F7FC' }}>
                  <th style={thStyle}>#</th>
                  <th style={thStyle}>Prestation</th>
                  <th style={thStyle}>Adresse</th>
                  <th style={thStyle}>Prestataire</th>
                  <th style={thStyle}>Statut</th>
                  <th style={thStyle}>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats?.dernieres_reservations?.map((r, i) => (
                  <tr key={r.id} style={{
                    borderBottom: '1px solid #eee',
                    backgroundColor: i % 2 === 0 ? 'white' : '#FAFAFA'
                  }}>
                    <td style={tdStyle}>{r.id}</td>
                    <td style={tdStyle}>{r.prestation}</td>
                    <td style={tdStyle}>{r.adresse}</td>
                    <td style={tdStyle}>{r.prestataire}</td>
                    <td style={tdStyle}>
                      <span style={{
                        backgroundColor: '#E8F5E9', color: '#22AA44',
                        padding: '3px 10px', borderRadius: '20px',
                        fontSize: '12px', fontWeight: 'bold'
                      }}>
                        {r.statut}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      {new Date(r.created_at).toLocaleDateString('fr-FR', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  )
}

const thStyle = {
  padding: '12px 15px', textAlign: 'left',
  fontSize: '12px', color: '#666',
  fontWeight: 'bold', textTransform: 'uppercase'
}

const tdStyle = {
  padding: '12px 15px', fontSize: '13px', color: '#333'
}

export default Admin
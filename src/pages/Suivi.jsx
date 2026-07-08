import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import NavBar from '../components/NavBar'

// Fix icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Icône voiture personnalisée
const iconeVoiture = L.divIcon({
  html: '🚗',
  className: '',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
})

// Icône client
const iconeClient = L.divIcon({
  html: '📍',
  className: '',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
})

function Suivi() {
  const navigate = useNavigate()
 const calculerETA = (pos1, pos2) => {
  const R = 6371
  const dLat = (pos2[0] - pos1[0]) * Math.PI / 180
  const dLon = (pos2[1] - pos1[1]) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(pos1[0] * Math.PI/180) * Math.cos(pos2[0] * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return Math.round(distance / 0.5 * 6)
}

const [eta, setEta] = useState(() => calculerETA([5.4150, -4.0167], [5.3484, -3.9897]))
  const [statut, setStatut] = useState('en_route')

  // Position client — Abidjan Cocody
  const positionClient = [5.3484, -3.9897]

  // Position prestataire — commence à Abobo, se déplace vers Cocody
  const [positionPrestataire, setPositionPrestataire] = useState([5.4150, -4.0167])

  // Animation du prestataire qui se rapproche
  useEffect(() => {
    const interval = setInterval(() => {
      setPositionPrestataire(prev => {
        const newLat = prev[0] - 0.003
        const newLng = prev[1] + 0.002
        if (newLat <= positionClient[0]) {
          setStatut('arrivé')
          clearInterval(interval)
          return positionClient
        }
        return [newLat, newLng]
      })
      setEta(prev => {
        if (prev <= 0) return 0
        return prev - 1
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
        <h1 style={{ color: 'white', margin: 0, fontSize: '18px' }}>
          📍 Suivi de votre lavage
        </h1>
      </div>

      {/* Vraie carte OpenStreetMap */}
      <div style={{ height: '250px', width: '100%' }}>
        <MapContainer
          center={[5.38, -4.00]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />
          <Marker position={positionClient} icon={iconeClient}>
            <Popup>📍 Votre position</Popup>
          </Marker>
          <Marker position={positionPrestataire} icon={iconeVoiture}>
            <Popup>🚗 Kouassi Bernard</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div style={{ padding: '15px', paddingBottom: '80px' }}>

        {/* Confirmation */}
        <div style={{
          backgroundColor: '#E8F5E9', border: '1px solid #22AA44',
          borderRadius: '12px', padding: '12px', marginBottom: '12px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#22AA44', fontWeight: 'bold', margin: 0 }}>
            ✅ Réservation confirmée !
          </p>
          <p style={{ color: '#555', margin: '4px 0 0', fontSize: '13px' }}>
            Votre prestataire est en route
          </p>
        </div>

        {/* Info prestataire */}
        <div style={{
          backgroundColor: 'white', borderRadius: '12px',
          padding: '15px', marginBottom: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <p style={{ color: '#888', margin: '0 0 4px', fontSize: '13px' }}>Votre prestataire</p>
          <p style={{ color: '#1B4F8A', fontWeight: 'bold', margin: '0 0 4px', fontSize: '18px' }}>
            Kouassi Bernard
          </p>
          <p style={{ color: '#888', margin: 0, fontSize: '13px' }}>⭐ 4,8 · 127 avis</p>
        </div>

        {/* Statuts */}
        <div style={{
          backgroundColor: 'white', borderRadius: '10px',
          padding: '12px', marginBottom: '12px',
          display: 'flex', justifyContent: 'space-around',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <span style={{ color: '#22AA44', fontWeight: 'bold', fontSize: '12px' }}>✅ Acceptée</span>
          <span style={{ color: statut === 'en_route' ? '#1B4F8A' : '#22AA44', fontWeight: 'bold', fontSize: '12px' }}>🔵 En route</span>
          <span style={{ color: statut === 'arrivé' ? '#22AA44' : '#CCC', fontSize: '12px' }}>📍 Arrivé</span>
        </div>

        {/* ETA */}
        <div style={{
          backgroundColor: '#1B4F8A', borderRadius: '12px',
          padding: '15px', textAlign: 'center', marginBottom: '12px'
        }}>
          {eta > 0 ? (
            <>
              <p style={{ color: 'white', margin: '0 0 4px', fontSize: '13px' }}>Arrivée estimée</p>
              <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '28px' }}>
                ⏱ {eta} min
              </p>
            </>
          ) : (
            <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '18px' }}>
              📍 Votre prestataire est arrivé !
            </p>
          )}
        </div>

        {/* Boutons */}
        <button style={{
          width: '100%', padding: '14px',
          backgroundColor: 'white', color: '#1B4F8A',
          border: '2px solid #1B4F8A', borderRadius: '12px',
          fontSize: '15px', fontWeight: 'bold', cursor: 'pointer',
          marginBottom: '10px'
        }}>
          💬 Contacter le prestataire
        </button>

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
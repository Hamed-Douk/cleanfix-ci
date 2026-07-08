import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import NavBar from '../components/NavBar'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const iconeVoiture = L.divIcon({
  html: '🚗', className: '', iconSize: [30, 30], iconAnchor: [15, 15],
})
const iconeClient = L.divIcon({
  html: '📍', className: '', iconSize: [30, 30], iconAnchor: [15, 30],
})

// Calcul distance et ETA
function calculerETA(pos1, pos2) {
  const R = 6371
  const dLat = (pos2[0] - pos1[0]) * Math.PI / 180
  const dLon = (pos2[1] - pos1[1]) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(pos1[0] * Math.PI/180) * Math.cos(pos2[0] * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return Math.max(1, Math.round(distance / 0.5 * 6))
}

// Composant pour recentrer la carte
function RecenterMap({ position }) {
  const map = useMap()
  useEffect(() => {
    if (position) map.setView(position, 14)
  }, [position])
  return null
}

function Suivi() {
  const navigate = useNavigate()
  const [statut, setStatut] = useState('en_route')
  const [positionClient, setPositionClient] = useState([5.3484, -3.9897])
  const [localisationOK, setLocalisationOK] = useState(false)
  const [positionPrestataire, setPositionPrestataire] = useState([5.4150, -4.0167])
  const [eta, setEta] = useState(null)

  // Géolocalisation réelle du client
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = [position.coords.latitude, position.coords.longitude]
          setPositionClient(pos)
          setLocalisationOK(true)
          const etaCalcule = calculerETA([5.4150, -4.0167], pos)
          setEta(etaCalcule)
        },
        (error) => {
          console.log('Géolocalisation refusée, position par défaut')
          setEta(calculerETA([5.4150, -4.0167], [5.3484, -3.9897]))
        }
      )
    } else {
      setEta(calculerETA([5.4150, -4.0167], [5.3484, -3.9897]))
    }
  }, [])

  // Animation prestataire qui se rapproche
  useEffect(() => {
    if (eta === null) return
    const interval = setInterval(() => {
      setPositionPrestataire(prev => {
        const latDiff = (positionClient[0] - prev[0]) * 0.15
        const lngDiff = (positionClient[1] - prev[1]) * 0.15
        const newLat = prev[0] + latDiff
        const newLng = prev[1] + lngDiff
        const distance = Math.sqrt(
          Math.pow(newLat - positionClient[0], 2) +
          Math.pow(newLng - positionClient[1], 2)
        )
        if (distance < 0.001) {
          setStatut('arrivé')
          setEta(0)
          clearInterval(interval)
          return positionClient
        }
        return [newLat, newLng]
      })
      setEta(prev => {
        if (prev === null || prev <= 0) return 0
        return prev - 1
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [eta, positionClient])

  const centrecarte = [
    (positionClient[0] + positionPrestataire[0]) / 2,
    (positionClient[1] + positionPrestataire[1]) / 2
  ]

  return (
    <div style={{
      maxWidth: '390px', margin: '0 auto',
      minHeight: '100vh', backgroundColor: '#F4F7FC',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#1B4F8A', padding: '20px',
        paddingTop: '50px', textAlign: 'center'
      }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '18px' }}>
          📍 Suivi de votre lavage
        </h1>
        {localisationOK && (
          <p style={{ color: '#B3D1F0', margin: '4px 0 0', fontSize: '12px' }}>
            ✅ Position GPS activée
          </p>
        )}
      </div>

      <div style={{ height: '250px', width: '100%' }}>
        <MapContainer
          center={centrearte}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />
          <RecenterMap position={centrearte} />
          <Marker position={positionClient} icon={iconeClient}>
            <Popup>📍 Votre position</Popup>
          </Marker>
          <Marker position={positionPrestataire} icon={iconeVoiture}>
            <Popup>🚗 Kouassi Bernard — En route</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div style={{ padding: '15px', paddingBottom: '80px' }}>

        <div style={{
          backgroundColor: '#E8F5E9', border: '1px solid #22AA44',
          borderRadius: '12px', padding: '12px', marginBottom: '12px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#22AA44', fontWeight: 'bold', margin: 0 }}>
            ✅ Réservation confirmée !
          </p>
          <p style={{ color: '#555', margin: '4px 0 0', fontSize: '13px' }}>
            Votre prestataire est en route vers vous
          </p>
        </div>

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

        <div style={{
          backgroundColor: '#1B4F8A', borderRadius: '12px',
          padding: '15px', textAlign: 'center', marginBottom: '12px'
        }}>
          {eta === null ? (
            <p style={{ color: 'white', margin: 0 }}>⏳ Calcul en cours...</p>
          ) : eta > 0 ? (
            <>
              <p style={{ color: 'white', margin: '0 0 4px', fontSize: '13px' }}>Arrivée estimée</p>
              <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '28px' }}>
                ⏱ {eta} minute{eta > 1 ? 's' : ''}
              </p>
            </>
          ) : (
            <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '18px' }}>
              📍 Votre prestataire est arrivé !
            </p>
          )}
        </div>

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
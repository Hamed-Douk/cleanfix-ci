function NavBar() {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      width: '390px',
      backgroundColor: 'white',
      borderTop: '1px solid #E0E0E0',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '10px 0'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '22px' }}>🏠</div>
        <p style={{ margin: 0, fontSize: '10px', color: '#1B4F8A', fontWeight: 'bold' }}>Accueil</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '22px' }}>📋</div>
        <p style={{ margin: 0, fontSize: '10px', color: '#888' }}>Réservations</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '22px' }}>💳</div>
        <p style={{ margin: 0, fontSize: '10px', color: '#888' }}>Abonnement</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '22px' }}>👤</div>
        <p style={{ margin: 0, fontSize: '10px', color: '#888' }}>Profil</p>
      </div>
    </div>
  )
}

export default NavBar
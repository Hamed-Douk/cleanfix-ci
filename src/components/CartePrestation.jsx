function CartePrestation({ emoji, titre, prix }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '15px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontSize: '28px' }}>{emoji}</div>
      <p style={{ color: '#1B4F8A', fontWeight: 'bold', margin: '8px 0 4px', fontSize: '13px' }}>
        {titre}
      </p>
      <p style={{ color: '#888', margin: 0, fontSize: '12px' }}>
        {prix}
      </p>
    </div>
  )
}

export default CartePrestation
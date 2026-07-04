function Header() {
  return (
    <div style={{
      backgroundColor: '#1B4F8A',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <img
          src="/logo.png"
          alt="AutoDat"
          style={{
            height: '50px',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  )
}

export default Header
function Header() {
  return (
    <div style={{
      backgroundColor: '#1B4F8A',
      padding: '15px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    }}>
      <img
        src="/logo.png"
        alt="AutoDat"
        style={{
          height: '55px',
          objectFit: 'contain',
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '5px'
        }}
      />
    </div>
  )
}

export default Header
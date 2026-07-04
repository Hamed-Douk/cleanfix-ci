function Header() {
  return (
    <div style={{
      backgroundColor: '#1B4F8A',
      padding: '15px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <img
        src="/logo.png"
        alt="AutoDat"
        style={{
          height: '60px',
          objectFit: 'contain'
        }}
      />
    </div>
  )
}

export default Header
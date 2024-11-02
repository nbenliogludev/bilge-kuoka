import logo from '../assets/appLogo.png';

function Logo() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo" style={{ width: '120px', height: 'auto' }} />
      </header>
    </div>
  );
}

export default Logo;

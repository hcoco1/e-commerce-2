function NavigationBar({onLogout}) {


    function handleLogout() {
      fetch("/logout", {
        method: "DELETE",
        credentials: 'include',
      }).then(() => onLogout());
    }
  
  
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <ul className="navbar-nav" style={{ flexDirection: 'row', alignItems: 'center', listStyleType: 'none' }}>
  
                <li className="nav-item" style={{ marginRight: '10px' }}>
                  <Link to="/" className="nav-link">
                    <FaHome /> Home
                  </Link>
                </li>
  
                <li className="nav-item" style={{ marginRight: '10px' }}>
                  <Link to="/login" className="nav-link">
                    <FaSignInAlt /> Sign In
                  </Link>
                </li>
  
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    <FaSignOutAlt /> Sign Up
                  </Link>
                </li>
  
                <li className="nav-item">
                  <Link to="/user" className="nav-link">
                    <FaSignOutAlt /> Profile
                  </Link>
                </li>
  
                <li className="nav-item">
                <button onClick={handleLogout}>Sign Out</button>
                </li>
  
          </ul>
        </div>
      </nav>
    );
  }
  
  export default NavigationBar;
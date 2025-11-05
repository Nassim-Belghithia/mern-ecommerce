import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import du Link
import "./Navbar.css";
import bagIcon from "../Assets/sac.jpg";
import cartIcon from "../Assets/chariot.png";
import { ShopContext } from "../../Context/ShopContext";
import { getUser, removeToken, removeUser } from "../../services/api";

const Navbar = () => {
  const [active, setActive] = useState("Shop");
  const [user, setUserState] = useState(null);
  const navigate = useNavigate();
  const menuItems = [
    { name: "Shop", path: "/" },
    { name: "Men", path: "/mens" },
    { name: "Women", path: "/women" },
    { name: "Kids", path: "/kids" },
  ];
  const {getTotalCartItems}=useContext(ShopContext);

  useEffect(() => {
    const loadUser = () => {
      const currentUser = getUser();
      setUserState(currentUser);
    };
    
    loadUser();
    
    // Listen for storage changes (if user logs in/out in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        loadUser();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    removeToken();
    removeUser();
    setUserState(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="navbar">
      {/* --- Partie gauche --- */}
      <div className="navbar-left">
        <img src={bagIcon} alt="bag" className="bag-icon" />
        <h2 className="logo">SHOPPER</h2>
      </div>

      {/* --- Menu central --- */}
      <nav className="navbar-center">
        <ul className="menu">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`menu-item ${active === item.name ? "active" : ""}`}
              onClick={() => setActive(item.name)}
            >
              <Link
                to={item.path}
                style={{
                  textDecoration: "none", // enlève le soulignement
                  color: "inherit", // garde la même couleur que le texte
                }}
              >
                {item.name}
              </Link>
            </li>
          ))}
         <div className="underline"></div>

        </ul>
      </nav>

      {/* --- Partie droite --- */}
      <div className="navbar-right">
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: '#966d6dff', fontWeight: '600', fontSize: '17px' }}>Hi, {user.name}</span>
            <button className="login-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}
        
        <div className="cart-container">
          <Link to="/cart">
          <img src={cartIcon} alt="cart" className="cart-icon" /></Link>
          <span className="cart-count">{getTotalCartItems()}</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

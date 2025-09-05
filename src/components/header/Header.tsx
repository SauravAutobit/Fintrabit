import "./Header.css";

const Header = () => {
  return (
    <nav className="navbar header-container">
      <div className="container-fluid">
        <a className="navbar-brand text-color">DUMMY LOGO</a>

        <p>
          Welcome, <span className="header-text">Admin</span>
        </p>
      </div>
    </nav>
  );
};

export default Header;

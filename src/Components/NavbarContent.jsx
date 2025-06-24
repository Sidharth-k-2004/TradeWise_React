import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavbarContent() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const handleProfile = () => {
    setModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/"); 
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg sticky-top shadow-lg"
        style={{ backgroundColor: "#ECFEFF" }}
      >
        <div className="container-fluid">
          <img src="Images/logo.png" className="img-fluid" alt="Logo" />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2  mb-lg-0">
              <li className="nav-item me-5 fs-4 hover-pop">
                <a className="nav-link active text-muted" href="/display">
                  <i className="bi bi-speedometer2 me-2"></i>Dashboard
                </a>
              </li>
              <li className="nav-item me-5 fs-4 hover-pop">
                <a className="nav-link" href="/holdings">
                  <i className="bi bi-bar-chart-fill me-2"></i>Holdings
                </a>
              </li>
              <li className="nav-item me-5 fs-4 hover-pop">
                <a className="nav-link" href="/funds">
                  <i className="bi bi-wallet2 me-2"></i>Funds
                </a>
              </li>
              <li className="nav-item me-5 fs-4 hover-pop">
                <a className="nav-link" href="/wishlist">
                  <i className="bi bi-heart me-2"></i>Wishlist
                </a>
              </li>
            </ul>
          </div>
          <div>
            <i
              className="bi bi-person-circle fs-2"
              style={{ cursor: "pointer" }}
              onClick={handleProfile}
            ></i>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {modal && (
        <div
          style={{
            position: "fixed",
            top: "15%",
            right: "2%",
            zIndex: 1000,
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px 25px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <p className="mb-3 fw-bold text-dark">Are you sure you want to log out?</p>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className="btn btn-secondary ms-2"
              onClick={() => setModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

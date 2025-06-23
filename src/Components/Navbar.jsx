export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg sticky-top border-5 shadow-lg" style={{backgroundColor:"#ECFEFF"}} >
        <div className="container-fluid">
        <img src="Images/logo.png "  className="img-fluid" alt="" />
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2  mb-lg-0 ">
            <li className="nav-item me-5 fs-4">
            <a className="nav-link active text-muted" aria-current="page" href="/SignUp">Sign Up</a>
            </li>
            <li className="nav-item me-5 fs-4 ">
            <a className="nav-link" href="#">KnowMore</a>
            </li>
        </ul>
        </div>
        </div>
        </nav>
        
        
    );
}
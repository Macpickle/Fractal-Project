function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark box-shadow px-3">
            <div className="container-fluid">
                <img src="/images/logo.png" alt="logo" width="85" height="50" style={{filter: "invert(100%)"}} />
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item active">
                        <a className="btn btn-outline-light" href="/login">Login</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

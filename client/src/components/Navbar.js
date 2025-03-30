function Navbar() {
    const loggedIn = localStorage.getItem("LoggedIn");

    const Logout = () => {
        localStorage.clear();
    }

    return (
        {/* https://getbootstrap.com/docs/4.0/components/navbar/ */},
        <nav className="navbar navbar-dark bg-dark box-shadow px-3">
            {/* https://getbootstrap.com/docs/5.0/layout/containers/ */}
            <div className="container-fluid">
                <img src="/images/logo.png" alt="logo" width="85" height="50" style={{filter: "invert(100%)"}} />
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item active">
                        { loggedIn ? (
                            <>
                                <a className="btn btn-outline-light me-2" href="/register">Register Account</a>
                                <button className="btn btn-outline-light" onClick={() => {
                                    Logout();
                                    window.location.reload();
                                }}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <a className="btn btn-outline-light" href="/login">Login</a>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

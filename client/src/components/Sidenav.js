import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// sidenav component, takes in title as prop
function Sidenav({title}) {
    const navigate = useNavigate();

    // based on title, activate the corresponding nav-link
    useEffect(() => {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            if (link.textContent.trim() === title) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });    
    });

    const logout = () => {
        // remove token from local storage
        localStorage.removeItem("username");
        navigate('/login');
    }

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '250px', height: '100vh', outline: '1px solid #ccc' }}>
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <span className="fs-4">company</span>
            </div>
            <hr />

            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="/" className="nav-link" aria-current="page">
                        Home
                    </a>
                </li>
                {/*only show if role is admin*/}
                { localStorage.getItem("role") === "admin" && (
                    <li>
                        <a href="/dashboard" className="nav-link" aria-current="page">
                            Dashboard
                        </a>
                    </li>
                )}
            </ul>

            <hr />

            <div className="dropdown">
                <a href="/" className="d-flex align-items-center link-dark text-decoration-none" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="..." alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>{localStorage.getItem("username")}</strong>
                    <button onClick = {logout} className="btn btn-link">Logout</button> {/* temporary logout button */}
                </a>
            </div>
        </div>
    );
}

export default Sidenav;
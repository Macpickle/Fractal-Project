function Footer() {
    return (
        <footer className="footer">
            <div className="container py-3 d-flex justify-content-between align-items-center">
                <span className="text-muted">© 2025 Fractal</span>
                <span className="text-muted" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    Scroll to top
                </span>
                <span className="float-end">
                    <a href="/login" className="text-muted">Login</a>
                    <span className="px-2">|</span>
                    <a href="/register" className="text-muted">Register</a>
                </span>
            </div>
        </footer>
    );
}

export default Footer;
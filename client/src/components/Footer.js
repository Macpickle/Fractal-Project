function Footer() {
    return (
        {/* https://getbootstrap.com/docs/5.1/components/navbar/ */},
        <footer className="footer">

            {/*https://getbootstrap.com/docs/5.0/layout/containers/*/}
            <div className="container py-3 d-flex justify-content-between align-items-center">
                <span className="text-muted">© 2025 Fractal</span>
                <span 
                    className="text-muted" 
                    style={{ cursor: 'pointer' }} 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    Scroll to top
                </span>
                <span className="float-end">
                    <a href="/login" className="text-muted">Login</a>
                </span>
            </div>
        </footer>
    );
}

export default Footer;
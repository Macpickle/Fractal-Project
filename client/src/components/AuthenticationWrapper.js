import '../stylesheets/index.css';
import '../stylesheets/login.css';

// returns a default box for login, register and email recovery
function AuthenticationWrapper({children, title}) {
    return (
        <section className="login-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="shadow-lg p-3 mb-5 pt-5 bg-white rounded">
                            <div className="text-center">
                                <img className="mb-3" src="..." alt="LOGO" />
                                <h3 className="mt-5">{title}</h3>
                            </div>
                            
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuthenticationWrapper;
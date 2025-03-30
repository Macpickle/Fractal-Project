import '../stylesheets/index.css';
import '../stylesheets/login.css';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AxiosRequest from '../utils/Axios';

// returns a default box for login, register and email recovery
function AuthenticationWrapper({title}) {
    const location = useLocation(); // object to recieve data from different pages
    const navigate = useNavigate(); // object to redirect users

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const url = title === "Register" ? "/users/register" : "/users/login"; // set url to the relate to title

        AxiosRequest({
            url: url,
            method: "POST",
            data: {
                username: username,
                password: password,
            }
        }).then((res) => {
            // set localstorage items to store user
            if (res.data.ok && title === "Login") {
                localStorage.setItem("username", username);
                localStorage.setItem("LoggedIn", true);

                navigate("/");
            } if (res.data.ok && title === "Register") {
                navigate("/", {state: {message: "Account created successfully", username: username}});
            }
            else {
                document.querySelector(".error").style.display = "block";
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    // reset display of error message
    const resetError = () => {
        document.querySelector(".error").style.display = "none";
    }
    
    // sets username input field to value if redirected from registering
    useEffect(() => {
        if (location.state) {
            document.getElementById("username").value = location.state.username;
        }
    });

    return (
        <section className="login-section">
            {/*https://getbootstrap.com/docs/5.0/layout/containers/*/}
            <div className="container">

                {/*https://getbootstrap.com/docs/5.0/layout/grid/*/}
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="loginForm p-3 mb-5 pt-5 ">
                            <div className="text-center">
                                <img src="/images/logo.png" alt="LOGO" width="125px" height="75px"/>
                                <h3 className="mt-5">{title}</h3>
                            </div> 
                            
                             {/*TEMP DELETE FOR PROD*/}
                            <div className="error alert alert-danger" style={{display: "none"}}>
                                <p className="mb-0">{title === "Login" ? "Invalid username or password" : "Username already exists"}</p>
                            </div>
                    
                            <div className="mt-3 mb-5">
                                <form onSubmit={handleSubmit}>
                    
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            placeholder="Username"
                                            required
                                            autoComplete="on"
                                            onChange={resetError}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            required
                                            autoComplete="on"
                                            onChange={resetError}
                                        />
                                    </div>
                    
                                    <button type="submit" className="btn btn-secondary w-100">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuthenticationWrapper;
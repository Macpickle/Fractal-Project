import '../stylesheets/index.css';
import '../stylesheets/login.css';

// components
import AuthenticationWrapper from "../components/AuthenticationWrapper"

// hooks
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

function Login() {
    const navigate = useNavigate(); // create navigate object for redirects    
    const location = useLocation(); // object to recieve data from different pages, in this case, from register account page

    // get email and password from form data
    const loginUser = (event) => {
        event.preventDefault(); 
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        axios.post('/login/', {email, password})
            .then(response => {
                const {detail} = response.data;

                // error handling
                if (detail === "Invalid email or password") {
                    document.querySelector(".error").style.display = "block";
                } 

                // if login is successful, set token in local storage
                if (detail === "Login Successful") {
                    const {username, role} = response.data.user;

                    // upon successful login, set token in local storage
                    localStorage.setItem("username", username);
                    localStorage.setItem("role", role);
                    navigate('/');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    // reset display of error message
    const resetError = () => {
        document.querySelector(".error").style.display = "none";
    }
    
    // sets username input field to value if redirected from registering
    useEffect(() => {
        if (location.state) {
            document.getElementById("email").value = location.state.email;
        }     
    }, [location.state]);

    return (
        <AuthenticationWrapper title={"Login"}>
            <div className="error alert alert-danger" style={{display: "none"}}>
                <p className="mb-0">Invalid email or password</p>
            </div>

            <div className="mt-3 mb-5">
                <p>Dont have an account? <a href="/register">Sign up</a></p>
                <form onSubmit={loginUser}>

                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
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

                    <div className="mb-3 form-check d-flex align-items-center">
                        <input type="checkbox" className="form-check-input" id="remember"/>
                        <p className="p-0 m-0"><label className="form-check-label ms-2 mb-0" htmlFor="remember">Remember me</label></p>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                    <p><a href="/forgot-password" className="float-end">Forgot password?</a></p>
                </form>
            </div>
        </AuthenticationWrapper>
    );
}

export default Login;
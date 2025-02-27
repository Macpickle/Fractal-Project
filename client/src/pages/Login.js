import '../stylesheets/index.css';
import '../stylesheets/login.css';

// components
import AuthenticationWrapper from "../components/AuthenticationWrapper"

// hooks
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Login() {
    const navigate = useNavigate(); // create navigate object for redirects    
    const location = useLocation(); // object to recieve data from different pages, in this case, from register account page

    // get username and password from form data
    const loginUser = (event) => {
        event.preventDefault(); 
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        console.log(username, password, remember);
        // check if user is in database
        // (eg. check if username and password are valid)
        // if valid, home page and set token in local storage
        // else raise errors
        
        
        

        // upon successful login, set token in local storage
        localStorage.setItem("username", username);
        navigate('/');
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
        <AuthenticationWrapper title={"Login"}>
            {/*TEMP DELETE FOR PROD*/}
            <div className="error alert alert-danger" style={{display: "none"}}>
                <p className="mb-0">Invalid username or password</p>
            </div>

            <div className="mt-3 mb-5">
                <p>Dont have an account? <a href="/register">Sign up</a></p>
                <form onSubmit={loginUser}>

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

                    <div className="mb-3 form-check d-flex align-items-center">
                        <input type="checkbox" className="form-check-input" id="remember"/>
                        <p className="p-0 m-0"><label className="form-check-label ms-2 mb-0" htmlFor="remember">Remember me</label></p>
                    </div>

                    <button type="submit" className="btn btn-secondary w-100">Submit</button>
                </form>
            </div>
        </AuthenticationWrapper>
    );
}

export default Login;
import '../stylesheets/index.css';
import '../stylesheets/login.css';

// components
import AuthenticationWrapper from "../components/AuthenticationWrapper"

// hooks
import { useNavigate } from 'react-router-dom';

import database from '../database/database'; // temporary database

function Register() {
    const navigate = useNavigate(); // create navigate object for redirects    

    // get username and password from input fields
    const registerUser = (event) => {
        event.preventDefault(); 
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log(username, email, password);
        // check if user can be created with these credentials
        // (eg. check if user and email is unique)
        // if valid, login page
        // else raise errors
        
        const user = database.find(user => user.username === username || user.email === email);

        // error handling
        if (user) {
            document.querySelector(".error").style.display = "block";
            return;
        }
        
        navigate('/login', {state: {username: username}});
    }

    // reset display of error message
    const resetError = () => {
        document.querySelector(".error").style.display = "none";
    }

    return (
        <AuthenticationWrapper title={"Sign Up"}>
            <div className="error alert alert-danger" style={{display: "none"}}>
                <p className="mb-0">Username or Email is already in use</p>
            </div>

            <div className="mt-3 mb-5">
                <form onSubmit={registerUser}>
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

                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>

                <div className="mt-1 text-center">
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </AuthenticationWrapper>
    );
}

export default Register;
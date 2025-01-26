import '../stylesheets/index.css';
import '../stylesheets/login.css';

// components
import AuthenticationWrapper from "../components/AuthenticationWrapper"

// hooks
import { useState } from 'react';

function EmailRecovery() {
    const [sent, setSent] = useState(false);
    const [email, setEmail] = useState("");
    
    // gets input field of email
    const recover = (event) => {
        event.preventDefault(); 

        const email = document.getElementById("email").value;

        // try to send email to user with password recovery link
        // if email is valid and exists, send the email
        // else, do nothing, don't let user know if email exists (security)

        setEmail(email);
        setSent(true);
        
        console.log(email);
    }

    return (
        <AuthenticationWrapper title={"Email Recovery"}>
            {sent ? (
                <div className="mt-3 mb-5">
                    <p>An email has been sent to the email <strong>{email}</strong> with a link to recover your password. Please check your email and follow the instructions provided.</p>
                    <div className="d-flex justify-content-end">
                        <p><a href="/login">Login</a></p>
                        <p className="mx-2"></p>
                        <p><a href="/register">Register</a></p>
                    </div>
                </div>
            ) : (
            <div className="mt-3 mb-5">
                <p>Please provide the email associated with your account to recover your password.</p>
                <form onSubmit={recover}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            required
                            autoComplete="on"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-2">Submit</button>
                    
                    <div className="d-flex justify-content-end">
                        <p><a href="/login">Login</a></p>
                        <p className="mx-2"></p>
                        <p><a href="/register">Register</a></p>
                    </div>
                </form>
            </div>
            )}
        </AuthenticationWrapper>
    );
}

export default EmailRecovery;
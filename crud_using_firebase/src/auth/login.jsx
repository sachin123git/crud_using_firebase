
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(database, (user) => {
            if (user) {
                navigate('/countrypage');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(database, email, password);
            alert('Login Successful');
            navigate('/countrypage');
        } catch (error) {
            if (error.code === 'auth/invalid-login-credentials') {
                alert('Email and Password do not exist. Please Register with Email.');
            } else {
                alert('Error logging in: ' + error.message);
            }
        }
    };

    const redirectToRegister = () => {
        navigate('/registerpage');
    };

    return (
        <>
            <div className="container" style={{ marginTop: "150px", width: "500px", backgroundColor: "#45474B", border: "2px solid black", borderRadius: "10px" }}>
                <form style={{ paddingTop: "50px", color: "white" }}>
                    <div><h3>Login</h3></div>
                    {/* Email input */}
                    <div className="form-outline mb-4">
                        <input type="email" id="form2Example1" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                        <label className="form-label" htmlFor="form2Example1">
                            Email address
                        </label>
                    </div>
                    {/* Password input */}
                    <div className="form-outline mb-4">
                        <input type="password" id="form2Example2" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                        <label className="form-label" htmlFor="form2Example2">
                            Password
                        </label>
                    </div>
                    {/* Submit button */}
                    <button type="button" className="btn btn-primary btn-block mb-4" style={{ marginLeft: "190px" }} onClick={handleLogin}>
                        Login
                    </button>
                    {/* Redirect to register page */}
                    <div className="text-center">
                        <p>
                            Not a member? <button onClick={redirectToRegister}>Register</button>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { database } from '../firebase'
import { createUserWithEmailAndPassword , onAuthStateChanged } from 'firebase/auth'

export default function regipage() {

    const navigate = useNavigate()
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [username, setUsername] = useState('');

    const login = () =>{
       navigate("/")
    }

    const handleSignIn = async () => {
      try {
          await createUserWithEmailAndPassword(database, email, password);
          alert('Registration Successful');
          navigate('/countrypage');
      } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
              alert('Email is already in use. Please choose a different email.');
          } else {
              alert('Error registering: ' + error.message);
          }
      }
  };

  useEffect(() => {
    // Check if the user is already authenticated
    // You need to replace this with your actual authentication check logic
    // For example, you can use Firebase Auth onAuthStateChanged to check if the user is logged in
    const unsubscribe = onAuthStateChanged(database, (user) => {
        if (user) {
            navigate('/countrypage');
        }
    });

    return () => unsubscribe();
}, [navigate]);

    return (
        <>
        <div className='container' style={{marginTop:"150px", width:"500px", backgroundColor:"#45474B", border:"2px solid black",borderRadius:"10px"}}>
                <form style={{paddingTop:"50px" , color:"white"}}>
                    <div><h3>Register</h3></div>
                    <div className="form-outline mb-4">
                        <input type="text" id="form2Example3" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
                        <label className="form-label" htmlFor="form2Example1">
                            User name
                        </label>
                    </div>
                    {/* Email input */}
                    <div className="form-outline mb-4">
                        <input type="email" id="form2Example1" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
                        <label className="form-label" htmlFor="form2Example1">
                            Email address
                        </label>
                    </div>
                    {/* Password input */}
                    <div className="form-outline mb-4">
                        <input type="password" id="form2Example2" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                        <label className="form-label" htmlFor="form2Example2">
                            Password
                        </label>
                    </div>
                    {/* Submit button */}
                    <button type="button" className="btn btn-primary btn-block mb-4" style={{marginLeft:"190px"}} onClick={handleSignIn}>
                    Register
                    </button>
                    {/* Register buttons */}
                    <div className="text-center">
                        <p>
                            Already a member? <button type='button' onClick={login}> login</button>
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
}



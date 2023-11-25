import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { database } from '../firebase';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export default function Header() {

    const navigate = useNavigate() 
    console.log("==>",database)

    // const handleClick = () => {
    //     navigate('/formpage');
    //   };
    
    const handleLogout = async () => {
      try {
        await database.signOut();
        alert('Logout successful');
        navigate('/'); 
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    useEffect(() => {

      const unsubscribe = onAuthStateChanged(database, (user) => {
          if (!user) {
              navigate('/');
          }
      });
  
      return () => unsubscribe();
  }, [navigate]);
  

  return (
    <div>
      <div>
        <nav
          className="navbar bg-dark border-bottom border-body w-auto"
          data-bs-theme="dark"
          style={{ margin: '20px 0px' }}
        >
            <div>
            <ul style={{color:"white", listStyle:"none", display:"flex", justifyContent:"center", textAlign:"center", fontSize:"30px",fontFamily:"cursive"}}>
               <Link to={'/countrypage'} style={{ textDecoration:"none"}}><li style={{marginRight:"30px",}}>Country</li></Link> 
               <Link to={'stateListpage'} style={{ textDecoration:"none"}}><li style={{marginRight:"30px",color:"white"}}>State</li></Link>
               <Link to={'cityListpage'} style={{ textDecoration:"none"}}><li style={{marginRight:"30px",color:"white"}}>City</li></Link>
            </ul>
            </div>
          {/* <button
            type="button"
            className="btn btn-primary"
            style={{
              padding: '10px 80px',
              marginRight:"40px"
            }}
            onClick={handleClick}
          >
            Add User
          </button> */}
          <div style={{
              padding: '10px 80px',
              marginRight:"40px"
            }}>
              <button type="button" class="btn btn-info" onClick={handleLogout}>LOGOUT</button>
              </div>
        </nav>
      </div>
    </div>
  )
}

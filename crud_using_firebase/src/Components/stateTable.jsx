// Table.js
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CountryTable() {

    const navigate = useNavigate();
    const [state, setState] = useState([]);
    console.log(state)
    const { id } = useParams()

    const handleClick = () => {
        navigate("/stateformpage");
    }

    const handleDelete = async (id) => {
        console.log(id)
        try{
          await deleteDoc(doc(db , "state" , id))
          setState((prestate)=> prestate.filter(state => state.id !== id))
          toast.success(`State deleted successfully`);
        }catch(error){
          toast.error()
        }
    }

    const handleEdit = (id) => {
      navigate(`/stateEditformpage/edit/${id}`);
    }

    useEffect(() => {
      const fetchData = async () => {
        const statesCollection = collection(db, 'state'); 
        const statesSnapshot = await getDocs(statesCollection);
        const statesData = statesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setState(statesData);
      };
    
      fetchData();
    }, []);
    

    return (
        <>
            <div className="box">
                <div className="table container">
                    <h6>
                        <span className="badge bg-success" style={{
                            padding: '10px 80px',
                            position: "relative",
                            left: "30%",
                            top: "54px",
                            width: '450px',
                            fontSize: "20px",
                            color: "black",
                            border: "4px solid black",
                            borderBottom: "0px"
                        }}>State Table</span>
                    </h6>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{
                            padding: '10px 80px',
                            position: "relative",
                            left: "82.5%",
                        }}
                        onClick={handleClick}
                    >
                        Add User
                    </button>
                    <table className="table table-striped table table-dark table-striped" style={{ textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th>State_ID</th>
                                <th>Country_Name</th>
                                <th>State_Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.map((state) => (
                                <tr key={state.id}>
                                    <td>{state.id}</td>
                                    <td>{state.country_name}</td>
                                    <td>{state.state_name}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => handleEdit(state.id)}
                                            style={{ marginRight: "10px" }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(state.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

// Table.js
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CityTable() {

    const navigate = useNavigate();
    const [city, setCity] = useState([]);
    console.log(city)
    const { id } = useParams()

    const handleClick = () => {
        navigate("/cityformpage");
    }

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "city", id))
        setCity((predata) => predata.filter(item => item.id !== id))
        toast.success(`City deleted successfully`);
    }

    const handleEdit = (id) =>{
        navigate(`/cityEditformpage/edit/${id}`)
    }

    useEffect(() => {
        const fetchData = async () => {
            const statesCollection = collection(db, 'city');
            const statesSnapshot = await getDocs(statesCollection);
            const cityData = statesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCity(cityData);
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
                        }}>City Table</span>
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
                                <th>city_ID</th>
                                <th>Country_Name</th>
                                <th>State_Name</th>
                                <th>City_Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {city.map((city) => (
                                <tr key={city.id}>
                                    <td>{city.id}</td>
                                    <td>{city.country_name}</td>
                                    <td>{city.state_name}</td>
                                    <td>{city.city_name}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => handleEdit(city.id)}
                                            style={{ marginRight: "10px" }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(city.id)}
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

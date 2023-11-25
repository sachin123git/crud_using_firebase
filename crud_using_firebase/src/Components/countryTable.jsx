// Table.js
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CountryTable() {

    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    console.log(countries)
    const { id } = useParams()

    const handleClick = () => {
        navigate("formpage");
    }

    useEffect(() => {
        const fetchData = async () => {
            const countriesCollection = collection(db, 'data');
            const countriesSnapshot = await getDocs(countriesCollection);
            const countriesData = countriesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCountries(countriesData);
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        navigate(`/countryEditformpage/edit/${id}`)
    }

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'data', id));
            setCountries((prevCountries) => prevCountries.filter(country => country.id !== id));
            toast.success(`Country deleted successfully`);
        }
        catch (error) {
            toast.error("Error deleting country:", error.message);
        }
    }

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
                        }}>Country Table</span>
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
                                <th>Country_ID</th>
                                <th>Country_Name</th>
                                <th>Currency_Name</th>
                                <th>Currency_Code</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {countries.map((country) => (
                                <tr key={country.id}>
                                    <td>{country.id}</td>
                                    <td>{country.country_name}</td>
                                    <td>{country.currency_name}</td>
                                    <td>{country.currency_code}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => handleEdit(country.id)}
                                            style={{ marginRight: "10px" }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(country.id)}
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

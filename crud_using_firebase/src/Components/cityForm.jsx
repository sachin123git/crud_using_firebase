
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, getDocs, updateDoc, getDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CityForm() {

    const [loading, setLoading] = useState(false)
    const [countries, setCountries] = useState([]);
    const [state, setState] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const navigate = useNavigate()
    const { id } = useParams()

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

    useEffect(() => {
        const fetchData = async () => {
            const countriesCollection = collection(db, 'state');
            const countriesSnapshot = await getDocs(countriesCollection);
            const countriesData = countriesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setState(countriesData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchstateData = async () => {
            if (id) {
                try {
                    const cityDoc = await getDoc(doc(db, 'city', id));
                    if (cityDoc.exists()) {
                        const cityData = cityDoc.data();

                        setSelectedCountry(cityData.country_name);
                        formik.setFieldValue("country_name", cityData.country_name);
                        formik.setFieldValue("state_name", cityData.state_name);
                        formik.setFieldValue("city_name", cityData.city_name);
                    }
                } catch (error) {
                    console.error('Error fetching state:', error.message);
                }
            }
        };

        fetchstateData();
    }, [id]);

    const initialValues = {
        country_name: '',
        state_name: '',
        city_name: '',
    };

    const validationSchema = Yup.object().shape({
        country_name: Yup.string().required(),
        state_name: Yup.string().required(),
        city_name: Yup.string().required(),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            try {
                if (id) {
                    await updateDoc(doc(db, 'city', id), values);
                    toast.success('Data updated successfully');
                } else {
                    await addDoc(collection(db, 'city'), values);
                    toast.success('state added successfully');
                }
                console.log('Document updated successfully');
            } catch (error) {
                toast.error('Error updating document');
            }

            await new Promise((resolve) => setTimeout(resolve, 2500));
            formik.resetForm();
            navigate('/cityListpage')
        },
    });

    return (
        <>
            <form
                style={{
                    width: '500px',
                    border: '2px solid black',
                    position: 'absolute',
                    top: '30%',
                    left: '35%',
                    padding: '30px',
                }}
                onSubmit={formik.handleSubmit}
            >
                <div className="mb-3">
                    <label htmlFor="country_name" className="form-label">
                        country_name
                    </label>
                    {/* <select
                        className="form-select"
                        aria-label="Default select example"
                        id="country_name"
                        name="country_name"
                        value={formik.values.country_name}
                        onChange={(e) => {
                            formik.handleChange(e);
                        }}
                        onBlur={formik.handleBlur}
                    > */}
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        id="country_name"
                        name="country_name"
                        value={formik.values.country_name}
                        onChange={(e) => {
                            setSelectedCountry(e.target.value);
                            formik.handleChange(e);
                        }}
                        onBlur={formik.handleBlur}
                    >

                        <option value="">Open this select menu</option>
                        {countries.map((item) => (
                            <option key={item.country_id} value={item.country_id}>
                                {item.country_name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.country_name && formik.errors.country_name ? (
                        <p style={{ color: 'red' }}>{formik.errors.country_name}</p>
                    ) : null}
                </div>

                <div className="mb-3">
                    <label htmlFor="state_name" className="form-label">
                        state_name
                    </label>
                    {/* <select
                        className="form-select"
                        aria-label="Default select example"
                        id="state_name"
                        name="state_name"
                        value={formik.values.state_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Open this select menu</option>
                        {state.map((item) => (
                            <option key={item.state_id} value={item.state_name}>
                                {item.state_name}
                            </option>
                        ))}
                    </select> */}
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        id="state_name"
                        name="state_name"
                        value={formik.values.state_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Open this select menu</option>
                        {state
                            .filter((item) => item.country_name === selectedCountry)
                            .map((item) => (
                                <option key={item.state_id} value={item.state_name}>
                                    {item.state_name}
                                </option>
                            ))}
                    </select>

                    {formik.touched.state_name && formik.errors.state_name ? (
                        <p style={{ color: 'red' }}>{formik.errors.state_name}</p>
                    ) : null}
                </div>

                <div className="mb-3">
                    <label htmlFor="city_name" className="form-label">
                        city_name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="city_name"
                        name="city_name"
                        value={formik.values.city_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.city_name && formik.errors.city_name ? (
                        <p style={{ color: 'red' }}>{formik.errors.city_name}</p>
                    ) : null}
                </div>
                {loading ?
                    <>
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-info" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </>
                    : <button type="submit" className="btn btn-primary">
                        {id ? "Save Changes" : "Submit"}
                    </button>
                }
            </form>
            <ToastContainer />
        </>
    );
}
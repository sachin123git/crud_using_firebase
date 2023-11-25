
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { addDoc, collection, getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserForm() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  const initialValues = {
    country_name: '',
    currency_name: '',
    currency_code: '',
  };

  const validationSchema = Yup.object().shape({
    country_name: Yup.string().required(),
    currency_name: Yup.string().required(),
    currency_code: Yup.string().required(),
  });

  useEffect(() => {
    const fetchCountryData = async () => {
      if (id) {
        try {
          const countryDoc = await getDoc(doc(db, 'data', id));
          if (countryDoc.exists()) {
            const countryData = countryDoc.data();
            formik.setValues(countryData);
          }
        } catch (error) {
          console.error('Error fetching country:', error.message);
        }
      }
    };

    fetchCountryData();
  }, [id]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setLoading(true);
      try {
        if (id) {
          await updateDoc(doc(db, 'data', id), values);
          toast.success('Data updated successfully');
        } else {
          await addDoc(collection(db, 'data'), values);
          toast.success('Data added successfully');
        }
        console.log('Document updated successfully');
      } catch (error) {
        toast.error('Error updating document');
      }
      formik.resetForm();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate('/countrypage');
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
          <input
            type="text"
            className="form-control"
            id="country_name"
            name="country_name"
            value={formik.values.country_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.country_name && formik.errors.country_name ? (
            <p style={{ color: 'red' }}>{formik.errors.country_name}</p>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="currency_name" className="form-label">
            currency_name
          </label>
          <input
            type="text"
            className="form-control"
            id="currency_name"
            name="currency_name"
            value={formik.values.currency_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.currency_name && formik.errors.currency_name ? (
            <p style={{ color: 'red' }}>{formik.errors.currency_name}</p>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="currency_code" className="form-label">
            currency_code
          </label>
          <input
            type="text"
            className="form-control"
            id="currency_code"
            name="currency_code"
            value={formik.values.currency_code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.currency_code && formik.errors.currency_code ? (
            <p style={{ color: 'red' }}>{formik.errors.currency_code}</p>
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
          </button>}
      </form>
      <ToastContainer />
    </>
  );
}
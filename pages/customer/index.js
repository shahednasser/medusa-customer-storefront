import * as Yup from 'yup';

import { useContext, useRef } from 'react';

import Profile from '../../components/layout/profile';
import StoreContext from "../../context/store-context";
import { createClient } from "../../utils/client"
import styles from "../../styles/customer.module.css";
import { useFormik } from 'formik';

export default function CustomerIndex() {
  const { customer, setCustomer } = useContext(StoreContext)
  const buttonRef = useRef()
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      email: customer?.email,
      first_name: customer?.first_name,
      last_name: customer?.last_name,
      password: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      password: Yup.string()
    }),

    onSubmit: (values) => {
      buttonRef.current.disabled = true;

      const client = createClient()

      if (!values.password) {
        delete values['password']
      }

      client.customers.update(values)
        .then(({ customer }) => {
          setCustomer(customer)
          alert("Account updated successfully")
          buttonRef.current.disabled = false;
        })
    }
  })

  return (
    <Profile activeLink='customer'>
      <form onSubmit={handleSubmit}>
        <h1>Edit Profile</h1>
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" className={styles.input} 
            onChange={handleChange} onBlur={handleBlur} value={values.email} />
          {errors.email && touched.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="first_name">First Name</label>
          <input type="text" name="first_name" id="first_name" className={styles.input} 
            onChange={handleChange} onBlur={handleBlur} value={values.first_name} />
          {errors.first_name && touched.first_name && <span className={styles.error}>{errors.first_name}</span>}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="last_name">Last Name</label>
          <input type="text" name="last_name" id="last_name" className={styles.input} 
            onChange={handleChange} onBlur={handleBlur} value={values.last_name} />
          {errors.last_name && touched.last_name && <span className={styles.error}>{errors.last_name}</span>}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" className={styles.input} 
            onChange={handleChange} onBlur={handleBlur} value={values.password} />
          {errors.password && touched.password && <span className={styles.error}>{errors.password}</span>}
        </div>
        <div className={styles.inputContainer}>
          <button type="submit" className={styles.btn} ref={buttonRef}>Save</button>
        </div>
      </form>
    </Profile>
  )
}
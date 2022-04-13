import * as Yup from 'yup';

import { useContext, useEffect, useRef } from 'react';

import StoreContext from '../context/store-context';
import { createClient } from "../utils/client"
import styles from "../styles/customer.module.css";
import { useFormik } from "formik";
import { useRouter } from 'next/router';

export default function SignUp() {
  const router = useRouter();
  const { setCustomer, customer } = useContext(StoreContext)
  useEffect(() => {
    if (customer) {
      router.push("/")
    }
  }, [customer, router])
  const buttonRef = useRef();
  const { handleSubmit, handleBlur, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      password: Yup.string().required()
    }),
    onSubmit: function (values) {
      if (buttonRef.current) {
        buttonRef.current.disabled = true;
      }

      const client = createClient()

      client.customers.create({
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password
      }).then(({ customer }) => {
        setCustomer(customer);
      })
    }
  })
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.signForm}>
          <h1>Sign Up</h1>
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
            <button type="submit" className={styles.btn} ref={buttonRef}>Sign Up</button>
          </div>
        </form>
      </main>
    </div>
  )
}
import { useContext, useEffect } from 'react';

import Link from 'next/link';
import StoreContext from '../../context/store-context';
import styles from "../../styles/customer.module.css";
import { useRouter } from 'next/router';

export default function Profile ({children, activeLink}) {
  const router = useRouter()
  const { customer } = useContext(StoreContext)
  useEffect(() => {
    if (!customer) {
      router.push('/')
    }
  }, [customer, router])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.profile}>
          <div className={styles.profileSidebar}>
            <Link href="/customer">
              <a className={activeLink === 'customer' ? styles.active : ''}>Edit Profile</a>
            </Link>
            <Link href="/customer/orders">
              <a className={activeLink === 'orders' ? styles.active : ''}>Orders</a>
            </Link>
            <Link href="/customer/addresses">
              <a className={activeLink === 'addresses' ? styles.active : ''}>Addresses</a>
            </Link>
          </div>
          <div className={styles.profileContent}>
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
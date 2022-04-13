import Profile from "../../components/layout/profile"
import StoreContext from "../../context/store-context"
import styles from "../../styles/customer.module.css"
import { useContext } from 'react'

export default function Addresses() {
  const { customer } = useContext(StoreContext)

  return (
    <Profile activeLink='addresses'>
      <h1>Addresses</h1>
      {customer && customer.shipping_addresses.length === 0 && <p>You do not have any addresses</p>}
      {customer && customer.shipping_addresses.map((address) => (
        <div key={address.id} className={styles.address}>
          <span><b>First Name:</b> {address.first_name}</span>
          <span><b>Last Name:</b> {address.last_name}</span>
          <span><b>Company:</b> {address.company}</span>
          <span><b>Address Line 1:</b> {address.address_1}</span>
          <span><b>Address Line 2:</b> {address.address_2}</span>
          <span><b>City:</b> {address.city}</span>
          <span><b>Country:</b> {address.country}</span>
        </div>
      ))}
    </Profile>
  )
}
import { useEffect, useState } from 'react';

import Link from 'next/link';
import Profile from '../../components/layout/profile';
import { createClient } from "../../utils/client"
import { formatMoneyAmount } from '../../utils/prices';
import styles from "../../styles/customer.module.css";
import { useRouter } from 'next/router';

export default function Orders () {
  const [orders, setOrders] = useState([])
  const [pages, setPages] = useState(0)
  const router = useRouter()
  const p = router.query.p ? parseInt(router.query.p - 1) : 0
  
  useEffect(() => {
    const client = createClient()

    client.customers.listOrders({
      limit: 20,
      offset: 20 * p
    }).then((result) => {
      setOrders(result.orders)
      setPages(Math.ceil(result.count / result.limit))
    })
  }, [p])

  return (
    <Profile activeLink='orders'>
      <h1>Orders</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{formatMoneyAmount({
                currencyCode: order.currency_code,
                amount: order.total
              }, 2)}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        {pages > 0 && p > 1 && (
          <Link href={`/customer/orders?p=${p - 1}`}>Previous</Link>
        )}
        {pages > 1 && p > 0 && p < pages && <span> - </span>}
        {pages > 1 && (p + 1) < pages && (
          <Link href={`/customer/orders?p=${p + 1}`}>Next</Link>
        )}
      </div>
    </Profile>
  )
}
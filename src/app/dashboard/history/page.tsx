'use client'

import axios from 'axios'
import React, { use, useEffect } from 'react'

export default function History() {
  const [payments, setPayments] = React.useState<any[]>([])

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('/api/payments')
        setPayments(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPayments()
  }, [])
  
  return (
    <div className='p-8'>
    <h1 className='text-4xl mb-4'>Payment History</h1>
    <hr className='mb-4' />
    <table className='min-w-full divide-y divide-gray-200'>
      <thead className='bg-gray-50'>
        <tr>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Payment Name</th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Recipient Address</th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
        </tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        {payments.map((payment) => (
          <tr key={payment.id}>
            <td className='px-6 py-4 whitespace-nowrap'>{payment.payment_name}</td>
            <td className='px-6 py-4 whitespace-nowrap'>{payment.amount}</td>
            <td className='px-6 py-4 whitespace-nowrap'>{payment.to_wallet_id}</td>
            <td className='px-6 py-4 whitespace-nowrap'>{payment.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  )
}

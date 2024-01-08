'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

export default function SavedPayments() {
  const [payments, setPayments] = React.useState<any[]>([])
  const router = useRouter()

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

  const redo = async (payment: any) => {
    try {
      const paymentObj = {
        amount: payment.amount,
        address: payment.to_wallet_id,
        savePayment: false,
        paymentName: payment.payment_name,
      }
      const response = await axios.post('/api/payments', paymentObj)
      if (response.status === 200) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className='p-8'>
    <h1 className='text-4xl mb-4'>Saved Payments</h1>
    <hr className='mb-4' />
    <table className='min-w-full divide-y divide-gray-200'>
      <thead className='bg-gray-50'>
        <tr>
          <th></th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Payment Name</th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Recipient Address</th>
          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
        </tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        {payments.filter(payment => payment.is_saved).map((payment) => (
          <tr key={payment.id}>
            <td className='px-6 py-4 whitespace-nowrap'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => redo(payment)}>
                Redo
              </button>
            </td>
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

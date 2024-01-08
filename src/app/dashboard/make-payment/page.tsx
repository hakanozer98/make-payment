"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function MakePayment() {
  const router = useRouter();
  const [payment, setPayment] = React.useState({
    amount: 0,
    address: "",
    savePayment: false,
    paymentName: "",
  });

  const onSubmit = async () => {
    const response = await axios.post("/api/payments", payment);
    if (response.status === 200) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl mb-4">Payment</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            placeholder="Amount"
            value={payment.amount}
            onChange={(e) =>
              setPayment({
                ...payment,
                amount: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Address"
            value={payment.address}
            onChange={(e) =>
              setPayment({
                ...payment,
                address: e.target.value,
              })
            }
          />
        </div>
        <div className="flex items-center ps-4 border border-gray-200 rounded mb-4">
          <input
            id="savePayment"
            type="checkbox"
            checked={payment.savePayment}
            onChange={(e) =>
              setPayment({
                ...payment,
                savePayment: e.target.checked,
              })
            }
            name="bordered-checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="savePayment"
            className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
          >
            Save Payment
          </label>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="paymentName"
          >
            Payment Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="paymentName"
            type="text"
            placeholder="Payment Name"
            value={payment.paymentName}
            onChange={(e) =>
              setPayment({
                ...payment,
                paymentName: e.target.value,
              })
            }
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onSubmit}
          >
            Make Payment
          </button>
        </div>
        
      </form>
    </div>
  );
}

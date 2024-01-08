import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import Web3 from "web3";

export default async function Dashboard() {
    const web3 = new Web3("https://rpc2.sepolia.org");
    const xata = getXataClient()
    const { userId } = auth()
    if (!userId) {
      return null
    }
    const user = await xata.db.users.read(userId)
    if (!user) {
      return null
    }

    const balanceInWei = await web3.eth.getBalance(user.walled_id!!);
    const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');

    return (
      <div className="flex justify-around items-center h-screen">
        <div className="flex flex-col space-y-16 w-1/3">
          <Link href="/dashboard/make-payment" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-8 px-4 rounded text-xl text-center">
            Make Payment
          </Link>
          <Link href="/dashboard/saved-payments" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-8 px-4 rounded text-xl text-center">
            Saved Payments
          </Link>
          <Link href="/dashboard/history" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-8 px-4 rounded text-xl text-center">
            History
          </Link>
        </div>
        <div className="flex flex-col space-y-16 w-1/2 text-center text-5xl">
            <p>{balanceInEther}</p>
        </div>
      </div>
    );
  }
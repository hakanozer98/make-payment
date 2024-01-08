import { getXataClient } from '@/xata';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import Web3 from 'web3';

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { amount, address, savePayment, paymentName } = reqBody;
    const userId = auth().userId;
    const web3 = new Web3("https://rpc2.sepolia.org");

    const xataClient = getXataClient();

    const user = await xataClient.db.users.read(userId!);
    web3.eth.accounts.wallet.add(user!.private_key!);
    const transaction = await web3.eth.sendTransaction({from: user?.walled_id!, to: address, value: web3.utils.toWei(amount, 'ether'), gasLimit: 21000});

    await xataClient.db.payments.create({
      user_id: userId,
      amount: amount,
      to_wallet_id: address,
      date: new Date().toISOString(),
      is_saved: savePayment,
      payment_name: paymentName,
    });

    return NextResponse.json({ message: 'Payment created successfully' });
  } catch {
    return NextResponse.json({ message: 'Method not allowed' });
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = auth().userId;
    const xataClient = getXataClient();
    const payments = await xataClient.db.payments.filter("user_id", userId).getAll();
    return NextResponse.json(payments);
  } catch {
    return NextResponse.json({ message: 'Method not allowed' });
  }
}
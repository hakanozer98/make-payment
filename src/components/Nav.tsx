'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

export default function Nav() {
    const { user, isLoaded } = useUser();
  return (
    <header>
        <nav className="flex justify-between p-4 bg-gray-800">
        <Link href="/" className="text-xl font-bold text-white p-1">Make Payment</Link>
        <div className='flex'>
            {
                isLoaded && user && (
                    <>
                    <UserButton afterSignOutUrl='/' />
                    <p className='text-white py-1 px-3'>{user.username}</p>
                    </>
                    
            )}
            
        </div>
        
        </nav>
    </header>
  );
};
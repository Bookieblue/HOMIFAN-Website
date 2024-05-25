'use client'

import React, { useState, useEffect } from 'react';

//Interface for the transaction object
interface Transaction {
  balance: string;
  title: string;
  type: string;
  amount: number;
  
}

const Balances = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('https://v2.base-borderless.com/api/transactions');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Fetched data:', data); 

        // Extract balance and transactions from the response
        const balance = data.data.balance;
        const transactions: Transaction[] = data.data.transactions;

        console.log('Formatted transactions:', transactions); 

        setBalance(balance);
        setTransactions(transactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className='shadow-xl bg-white rounded-xl w-full h-fit p-3 lg:p-6'>
    <p className='medium-18 text-gray-40'>Balances</p>
    <p className='medium-33 text-gray-40 cursor-pointer'>{`$${balance}`}</p>
    {transactions.map((transaction, index) => (
      <div key={index}>
        <div className='flex flex-col sm:flex-row justify-between mb-2 mt-4'>
          <p className='regular-16 text-gray-40 cursor-pointer'>
            {transaction.title} ({transaction.type})
          </p>
          <div className='flex gap-1 xl:gap-4 cursor-pointer items-center'>
            <img src='/minus.svg' width={20} height={20} alt='Minus' />
            <p className='regular-16 text-gray-40'>{`$${transaction.amount}`}</p>
            <img src='/plus.svg' width={20} height={20} alt='Plus' />
          </div>
        </div>
        {index !== transactions.length - 1 && <hr />}
      </div>
    ))}
  </div>
  );
}

export default Balances;

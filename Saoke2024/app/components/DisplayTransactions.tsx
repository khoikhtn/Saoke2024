'use client';

import React, { useState, useEffect } from 'react';
import { transactionStore } from '../store/transaction';

function DisplayTransactions() {
  const { transactions } = transactionStore();
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  console.log(transactions);
  // Format VND currency with commas
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Calculate the displayed transactions based on the current page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  
  // Use the updated transactions list for pagination
  const currentTransactions = Array.isArray(transactions) ? transactions.slice(indexOfFirstTransaction, indexOfLastTransaction) : [];

  // Calculate total pages based on the transactions length
  const totalPages = Array.isArray(transactions) ? Math.ceil(transactions.length / transactionsPerPage) : 0;

  // Pagination functions
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Reset page to 1 when transactions data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [transactions]);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Transactions
      </h1>
      <ul className="space-y-4">
        {currentTransactions.map((transaction, index) => (
          <li key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-left">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Date:</span> {transaction.date}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Code:</span> {transaction.code}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Amount:</span> {formatCurrency(Number(transaction.amount))}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Detail:</span> {transaction.detail}
            </p>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md text-white ${currentPage === 1 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          Previous
        </button>
        
        <span className="text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md text-white ${currentPage === totalPages ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DisplayTransactions;

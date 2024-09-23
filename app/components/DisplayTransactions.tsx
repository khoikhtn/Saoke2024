import React from 'react'
import { transactionStore } from '../store/transaction'

function DisplayTransactions() {

  const { transactions } = transactionStore();

  return (
    <div>
      <h1>Transactions</h1>
      <ul>
        {transactions && transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.date}: {transaction.amount} - {transaction.detail}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DisplayTransactions
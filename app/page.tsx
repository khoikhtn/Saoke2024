'use client'

import { Paragraph, SearchForm, DisplayTransactions } from "./components";
import { queryStore, transactionStore } from './store';

export default function Home() {

  const { amountRange } = queryStore();
  
  const { updateTransactions } = transactionStore();

  // Fetch data
  const fetchTransactions = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    try {
      const response = await fetch(`/api/transactions?amount_range=${amountRange}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      updateTransactions(result);
    } catch (err) {
      console.log("An unknown error occured")
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-dark-primary text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <Paragraph />
        <SearchForm fetchTransactions={fetchTransactions}/>
        <DisplayTransactions />
      </div>
    </div>
  );
}

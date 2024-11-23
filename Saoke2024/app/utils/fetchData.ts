'use client'

import { queryStore, transactionStore } from "../store";

// Fetch data
export const fetchTransactions = async (e: React.FormEvent<HTMLFormElement>) => {

  e.preventDefault();

  const { amountRange, detail } = queryStore.getState();
  const { updateTransactions } = transactionStore.getState();

  try {
    const response = await fetch(`/api/transactions?amount_range=${amountRange}&search_detail=${detail}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    updateTransactions(result);
  } catch (err) {
    console.log("An unknown error occured")
  }
};

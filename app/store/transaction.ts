import { create } from "zustand";

type Transaction = {
  date: string;
  code: string;
  amount: string;
  detail: string;
}

type TransactionState = {
  transactions: Transaction[] | null;
  updateTransactions: (newTransactions: Transaction[]) => void;
}

export const transactionStore = create<TransactionState>((set) => ({
  transactions: null,
  updateTransactions: (newTransactions: Transaction[]) => set(() => ({
    transactions: newTransactions
  }))
}))
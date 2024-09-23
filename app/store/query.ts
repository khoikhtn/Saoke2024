import { create } from 'zustand'

type QueryState = {
  amountRange: string;
  updateAmountRange: (newAmountRange: string) => void;
}

export const queryStore = create<QueryState>((set) => ({
  amountRange: '0',
  updateAmountRange: (newAmountRange: string) => set(() => ({
    amountRange: newAmountRange
  }))
}))
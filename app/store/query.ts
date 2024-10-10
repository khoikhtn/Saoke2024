import { create } from 'zustand'

type QueryState = {
  amountRange: string;
  detail: string;
  updateAmountRange: (newAmountRange: string) => void;
  updateDetail: (newDetail: string) => void;
}

export const queryStore = create<QueryState>((set) => ({
  amountRange: '0',
  detail: '',
  updateAmountRange: (newAmountRange: string) => set(() => ({
    amountRange: newAmountRange
  })),
  updateDetail: (newDetail: string) => set(() => ({
    detail: newDetail
  }))
}))
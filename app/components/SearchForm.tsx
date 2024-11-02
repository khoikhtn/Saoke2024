'use client'

import React from 'react'
import { formObjects } from '../objects/formObjects';
import { queryStore } from '../store/query';

type Option = {
  value: string;
  label: string;
};

type objectsType = {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  options?: Option[];
};

type SearchFormProps = {
  fetchTransactions: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ fetchTransactions }) => {

  const { amountRange, updateAmountRange, detail, updateDetail } = queryStore();
  const formobj: objectsType[] = formObjects;

  return (
    <form onSubmit={fetchTransactions} className="mb-8 bg-white dark:bg-dark-secondary p-6 rounded-lg shadow-md animate-slide-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formobj.map((item) => {
              if (item.type === 'text' || item.type === 'date') {
                return (
                  <div key={item.id}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-secondary mb-1">{item.label}</label>
                    <input
                      type={item.type}
                      id={item.id}
                      name={item.id}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-dark-primary dark:border-gray-600"
                      onChange={(e) => {
                        if (item.id === 'detail') {
                          updateDetail(e.target.value);
                          //console.log(detail)
                        }
                      }}
                    />
                  </div>
                );
              } else if (item.type === 'select') {
                return (
                  <div key={item.id}>
                    <label className="block text-sm font-medium dark:text-dark-secondary text-gray-700 mb-1">{item.label}</label>
                    <select
                      name={item.id}
                      id={item.id}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-dark-primary dark:border-gray-600"
                      value={item.id === 'amount_range' ? amountRange : undefined}
                      onChange={(e) => {
                        if (item.id === 'amount_range') {
                          updateAmountRange(e.target.value);
                          //console.log(amountRange)
                        }
                      }}
                    >
                      {item.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              }
            })}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Tìm kiếm giao dịch
            </button>
          </div>
        </form>
  )
}

export default SearchForm
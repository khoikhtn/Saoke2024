import { Paragraph, SearchForm, DisplayTransactions } from "./components";
import { fetchTransactions } from "./utils/fetchData";

export default function Home() {
  return (
    <div className="bg-gray-100 dark:bg-dark-primary text-gray-800 min-h-screen py-8">
      <div className="w-full px-6 space-y-8">
        {/* Paragraph Component */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-gray-900 dark:text-gray-100">
          <Paragraph />
        </div>

        {/* SearchForm Component */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 flex flex-col space-y-4">
          <SearchForm fetchTransactions={fetchTransactions}/>
        </div>

        {/* DisplayTransactions Component */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <DisplayTransactions />
        </div>
      </div>
    </div>
  );
}

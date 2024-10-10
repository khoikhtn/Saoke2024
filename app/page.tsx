import { Paragraph, SearchForm, DisplayTransactions } from "./components";
import { fetchTransactions } from "./utils/fetchData";

export default function Home() {
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


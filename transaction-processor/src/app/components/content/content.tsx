import { useTransactionContext } from "@/app/context/context";
import BadTransactions from "./bad-transactions/badTransactions";
import Accounts from "./accounts/accounts";
import Collections from "./collections/collections";
import AllTransactions from "./all-transactions/allTransactions";


export default function Content() {
  const { state } = useTransactionContext()

  return (
    <div className="mt-[24px]">
      {state.transactions.length === 0 && (
        <h1 className="text-[32px]">
          Upload a file to view transactions
        </h1>
      )}
      <div className='flex flex-col gap-y-[16px] h-screen'>
        {state.currentPage === 'All Transactions' && <AllTransactions />}
        {state.currentPage === 'Accounts' && <Accounts />}
        {state.currentPage === 'Collections' && <Collections />}
        {state.currentPage === 'Bad Transactions' && <BadTransactions />}
      </div >
    </div>
  );
}
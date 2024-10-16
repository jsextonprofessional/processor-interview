'use client'

// TO DO
// break up components into separate files
// paginate table
// Each file submitted should continue "in continuation of" previous submissions
// An ability to reset the system to blank (new)
// A chart of accounts that list the account name, its cards, and the amount on each card
// A list of accounts that we need to give to collections (any cards with a < 0.00 balance)
// A list of "bad transactions" that someone needs to go look at (any transactions that you were unable to parse)

import { SetStateAction, useState } from 'react';
import Papa from 'papaparse';

export default function Home() {
  const [csvData, setCsvData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results: { data: SetStateAction<any[]>; }) => {
          setCsvData(results.data);
        },
        header: true,
      });
    }
  };

  const headers = ["Account Name", "Card Number", "Transaction Amount", "Transaction Type", "Description", "Target Card Number"];

  const tableHeaders = headers.map(header => (
    <th key={header} className="px-6 py-3" >
      {header}
    </th >
  ));

  const tableBody =
    csvData.map((row, index) => (
      <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
        {Object.values(row).map((value, idx) => (
          <td key={idx} className='px-6 py-4'>{String(value)}</td>
        ))}
      </tr>
    ))


  return (
    <div className='flex flex-col items-center gap-y-[16px]'>
      <h1>Upload CSV</h1>
      <form>
        <label htmlFor="fileInput">Data</label>
        <input
          type="file"
          id="fileInput"
          accept=".csv"
          onChange={handleFileUpload}
        />
      </form>
      {csvData.length > 0 && (
        <div className='border-2 border-pink-400 max-h-[600px] min-h-[500px] overflow-y-auto rounded-2xl w-[70%]'>
          <table className='table-fixed w-full text-left text-gray-500 text-sm dark:text-gray-400'>
            <thead className='bg-gray-50 text-gray-700 text-xs uppercase dark:bg-gray-700 dark:text-gray-300'>
              <tr className="sticky top-0 bg-gray-50 dark:bg-gray-700">
                {tableHeaders}
              </tr>
            </thead>
            <tbody className='px-6 py-3 border-b-2 border-gray-200 text-left text-sm font-medium text-gray-300 tracking-wider'>
              {tableBody}
            </tbody>
          </table>
        </div>
      )}
    </div >
  );
}

// FIRST ITERATION BELOW. SOME USEFUL STUFF IN THERE:

//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <h1>Upload your transaction</h1>
//       <form className="border-4 border-yellow-400">
//         <div className="border-2 border-white flex flex-col">
//           <label htmlFor="">Upload a file:</label>
//           <input type="file" id="avatar" name="avatar" accept=".csv" />
//         </div>
//         <button>Submit</button>
//       </form>
//       <table className="border-4 border-pink-300">
//         <tr>
//           {tableHeaders}
//         </tr>
//       </table>
//     </div>
//   );
// }

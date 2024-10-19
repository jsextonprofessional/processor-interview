import { createContext, useReducer, useContext, ReactNode } from 'react';
import { TransactionContextType, TransactionState } from './types';
import { transactionReducer } from './reducer';

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactionContext must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const initialState: TransactionState = {
    transactions: [],
    parsedData: [],
    currentPage: 'All Transactions',
  };

  const [state, dispatch] = useReducer(transactionReducer, initialState);

  // const transactionsForCollections = state.parsedData.map((transaction) => {
  //   return {
  //     accountName: transaction.accountName,
  //     cardNumber: transaction.cardNumber,
  //     transactionAmount: transaction.transactionAmount,
  //     transactionType: transaction.transactionType,
  //     description: transaction.description,
  //     targetCardNumber: transaction.targetCardNumber,
  //   };
  // });

  // console.log('transactionsForCollections', transactionsForCollections);


  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};
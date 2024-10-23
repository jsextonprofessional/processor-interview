import { CardBalance, Transaction } from "@/app/types/types";

export const getAccountBalance = (transactions: Transaction[], cardNumber: string): number => {
  return transactions
    .filter((row) => row.cardNumber === cardNumber)
    .reduce((acc, row) => acc + row.transactionAmount, 0);
};

export const getNegativeBalanceAccounts = (transactions: Transaction[]) =>
  getUniqueAccountNumbers(transactions)
    .filter((cardNumber) => getAccountBalance(transactions, cardNumber) < 0)
    .map((cardNumber) => ({
      cardNumber,
      accountBalance: getAccountBalance(transactions, cardNumber),
    }));

export const getUniqueAccountNumbers = (transactions: Transaction[]): string[] => {
  return Array.from(new Set(transactions.map((row) => row.cardNumber)));
};

export const getUniqueAccountNumbersByName = (
  transactions: Transaction[],
  accountName: string | null
): string[] => {
  return Array.from(
    new Set(
      transactions
        .filter((row) => row.accountName === accountName)
        .map((row) => row.cardNumber)
    )
  );
};

export const aggregateAccountsData = (
  transactions: Transaction[],
  accountName: string
): CardBalance[] => {
  return getUniqueAccountNumbersByName(transactions, accountName).map((cardNumber) => ({
    cardNumber,
    accountBalance: formatUSD(getAccountBalance(transactions, cardNumber)),
  }));
};

export const formatUSD = (amount: number): string => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
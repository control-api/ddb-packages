import {DDBItemDefaults} from './common-ddb-types';

export type TransactionFacet = 'Transaction';

export type DDBTransaction = Transaction & DDBItemDefaults;

export type Transaction = {
  id: string;
  extId: string;
  time: number;
  description: string;
  mcc: number;
  originalMcc: number;
  hold: boolean;
  amount: number;
  operationAmount: number;
  currencyCode: number;
  commissionRate: number;
  cashbackAmount: number;
  balance: number;
  extCreatedAt: string;
  createdAt: string;
  updatedAt?: string;
  ignoredInCalculation?: boolean;
  comment?: string;
  receiptId?: string;
  invoiceId?: string;
  counterEdrpou?: string;
  counterIban?: string;
}


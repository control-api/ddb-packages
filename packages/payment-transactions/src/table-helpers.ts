import {DDB} from '@control-api/types-ddb';

export const tableName = 'payment_transactions';

export const USER_PREFIX = 'user';
export const TRANSACTION_FACET_TYPE = 'Transaction';
export const TRANSACTION_PREFIX = 'transaction';

export type DDBTransaction = Transaction & DDB.DDBItemDefaults;

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
  comment?: string;
  receiptId?: string;
  invoiceId?: string;
  counterEdrpou?: string;
  counterIban?: string;
}

export function getTransactionFacetKey(userId: string, transactionId: string): DDB.FacetKeys {
  return {
    hash_key: getTransactionHashKey(userId),
    range_key: getTransactionRangeKey(transactionId),
  };
}

export function getTransactionHashKey(userId: string): string {
  return `${USER_PREFIX}#${userId}#${TRANSACTION_PREFIX}`;
}

export function getTransactionRangeKey(transactionId: string): string {
  return `${TRANSACTION_PREFIX}#${transactionId}`;
}

export function getTransactionFacetType(): string {
  return TRANSACTION_FACET_TYPE;
}

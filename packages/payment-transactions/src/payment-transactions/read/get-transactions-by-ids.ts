import {batchGet, fromDDBItem} from '@control-api/common-ddb';
import type {PaymentTransactions} from '@control-api/types-ddb';
import {getTransactionFacetKey, tableName} from '../../table-helpers';

export async function getTransactionsByIds(
    userId: string,
    cardNumber: string,
    transactionIds: string[],
): Promise<PaymentTransactions.Transaction[]> {
  const keys = transactionIds.map((transactionId) => {
    return getTransactionFacetKey(userId, cardNumber, transactionId);
  });

  const ddbTransactions = await batchGet<PaymentTransactions.DDBTransaction>({tableName, keys});

  return ddbTransactions.map((item) => fromDDBItem<PaymentTransactions.DDBTransaction>(item));
}

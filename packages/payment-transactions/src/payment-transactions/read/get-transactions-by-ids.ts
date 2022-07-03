import {batchGet, fromDDBItem} from '@control-api/common-ddb';
import type {PaymentTransactions} from '@control-api/types-ddb';
import {getTransactionFacetKey, tableName} from '../../table-helpers';

type Params = {
  userId: string;
  cardId: string;
  transactionIds: string[],
}

export async function getTransactionsByIds({
  userId,
  cardId,
  transactionIds,
}: Params): Promise<PaymentTransactions.Transaction[]> {
  const keys = transactionIds.map((transactionId) => {
    return getTransactionFacetKey(userId, cardId, transactionId);
  });

  const ddbTransactions = await batchGet<PaymentTransactions.DDBTransaction>({tableName, keys});

  return ddbTransactions.map((item) => fromDDBItem<PaymentTransactions.DDBTransaction>(item));
}

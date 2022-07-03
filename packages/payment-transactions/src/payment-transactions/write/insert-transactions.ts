import {ulid} from 'ulid';
import {insertMany} from '@control-api/common-ddb';
import {PaymentTransactions} from '@control-api/types-ddb';
import {getTransactionFacetKey, getTransactionFacetType, tableName} from '../../table-helpers';

type Params = {
  userId: string,
  cardId: string,
  transactions: Omit<PaymentTransactions.Transaction, 'extId' | 'extCreatedAt' | 'createdAt'>[],
}

export async function insertTransactions({
  userId,
  cardId,
  transactions,
}: Params): Promise<void> {
  const ddbTransactions: PaymentTransactions.DDBTransaction[] = transactions.map((transaction) => {
    const extCreatedAt = new Date(transaction.time * 1000);
    const extId = transaction.id;
    const id = ulid(extCreatedAt.getTime());

    const ddbTransaction: PaymentTransactions.DDBTransaction = {
      ...getTransactionFacetKey(userId, cardId, id),
      facetType: getTransactionFacetType(),
      ...transaction,
      extCreatedAt: extCreatedAt.toISOString(),
      createdAt: new Date().toISOString(),
      extId,
      id,
    };

    return ddbTransaction;
  });

  await insertMany({TableName: tableName, Items: ddbTransactions});
}

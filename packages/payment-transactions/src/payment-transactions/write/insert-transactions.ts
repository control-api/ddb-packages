import {ulid} from 'ulid';
import {insertMany} from '@control-api/common-ddb';
import {PaymentTransactions} from '@control-api/types-ddb';
import {getTransactionFacetKey, getTransactionFacetType, tableName} from '../../table-helpers';

export async function insertTransactions(
    userId: string,
    cardNumber: string,
    transactions: Omit<PaymentTransactions.Transaction, 'extId' | 'extCreatedAt' | 'createdAt'>[],
): Promise<void> {
  const ddbTransactions: PaymentTransactions.DDBTransaction[] = transactions.map((transaction) => {
    const extCreatedAt = new Date(transaction.time * 1000);
    const extId = transaction.id;
    const id = ulid(extCreatedAt.getTime());
    const ddbTransaction: PaymentTransactions.DDBTransaction = {
      ...getTransactionFacetKey(userId, cardNumber, id),
      facetType: getTransactionFacetType(),
      ...transaction,
      extCreatedAt: new Date(transaction.time * 1000).toISOString(),
      createdAt: extCreatedAt.toISOString(),
      extId,
      id,
    };

    return ddbTransaction;
  });

  await insertMany({TableName: tableName, Items: ddbTransactions});
}

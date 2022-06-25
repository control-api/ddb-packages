import {ulid} from 'ulid';
import {insertMany} from '@control-api/common-ddb';
import {PaymentTransactions} from '@control-api/types-ddb';
import {getTransactionFacetKey, getTransactionFacetType, tableName} from '../../table-helpers';

export async function insertTransactions(userId: string, transactions: PaymentTransactions.Transaction[]): Promise<void> {
  const ddbTransactions: PaymentTransactions.DDBTransaction[] = transactions.map((transaction) => {
    const extId = transaction.id;
    const id = ulid();
    const ddbTransaction: PaymentTransactions.DDBTransaction = {
      ...getTransactionFacetKey(userId, id),
      facetType: getTransactionFacetType(),
      ...transaction,
      extId,
      id,
    };

    return ddbTransaction;
  });

  await insertMany({TableName: tableName, Items: ddbTransactions});
}

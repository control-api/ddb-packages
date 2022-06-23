import {insertMany} from '@control-api/common-ddb';
import {ulid} from 'ulid';
import {DDBTransaction, Transaction, getTransactionFacetKey, getTransactionFacetType, tableName} from '../../table-helpers';

export async function insertTransactions(userId: string, transactions: Transaction[]): Promise<void> {
  const ddbTransactions: DDBTransaction[] = transactions.map((transaction) => {
    const extId = transaction.id;
    const id = ulid();
    const ddbTransaction: DDBTransaction = {
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

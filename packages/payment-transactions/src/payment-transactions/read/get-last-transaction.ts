import {find, fromDDBItem} from '@control-api/common-ddb';
import {DDBTransaction, TRANSACTION_FACET_TYPE, TRANSACTION_PREFIX, Transaction, getTransactionHashKey, tableName} from '../../table-helpers';

export async function getLastTransactions(userId: string): Promise<Transaction> {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'hash_key = :hash_key and begins_with(range_key, :range_key) and facetType = :facetType',
    ExpressionAttributeValues: {
      ':hash_key': getTransactionHashKey(userId),
      ':range_key': TRANSACTION_PREFIX,
      ':facetType': TRANSACTION_FACET_TYPE,
    },
    ScanIndexForward: false,
  };

  const transactions = await find<DDBTransaction>(params);

  return fromDDBItem<DDBTransaction>(transactions[0]);
}

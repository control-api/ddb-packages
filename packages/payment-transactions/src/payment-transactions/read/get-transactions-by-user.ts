import {find, fromDDBItem} from '@control-api/common-ddb';
import {PaymentTransactions} from '@control-api/types-ddb';
import {CARD_NUMBER_PREFIX, TRANSACTION_FACET_TYPE, TRANSACTION_PREFIX, getTransactionHashKey, tableName} from '../../table-helpers';

export async function getTransactionsByUser(userId: string, cardNumber: string): Promise<PaymentTransactions.Transaction[]> {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'hash_key = :hash_key and begins_with(range_key, :range_key) and facetType = :facetType',
    ExpressionAttributeValues: {
      ':hash_key': getTransactionHashKey(userId),
      ':range_key': `${CARD_NUMBER_PREFIX}#${cardNumber}#${TRANSACTION_PREFIX}#`,
      ':facetType': TRANSACTION_FACET_TYPE,
    },
    ScanIndexForward: false,
  };

  const transactions = await find<PaymentTransactions.DDBTransaction>(params);

  return transactions.map((item) => fromDDBItem<PaymentTransactions.DDBTransaction>(item));
}

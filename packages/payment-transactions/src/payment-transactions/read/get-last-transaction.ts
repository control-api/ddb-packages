import {find, fromDDBItem} from '@control-api/common-ddb';
import {PaymentTransactions} from '@control-api/types-ddb';
import {
  CARD_NUMBER_PREFIX,
  TRANSACTION_PREFIX,
  getTransactionHashKey,
  tableName,
} from '../../table-helpers';

export async function getLastTransactions(
    userId: string,
    cardNumber: string,
): Promise<PaymentTransactions.Transaction | undefined> {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'hash_key = :hash_key and begins_with(range_key, :range_key)',
    ExpressionAttributeValues: {
      ':hash_key': getTransactionHashKey(userId),
      ':range_key': `${CARD_NUMBER_PREFIX}#${cardNumber}#${TRANSACTION_PREFIX}#`,
    },
    ScanIndexForward: false,
  };

  const transactions = await find<PaymentTransactions.DDBTransaction>(params);
  console.log('transactions', transactions);

  if (!transactions?.length) {
    return;
  }

  return fromDDBItem<PaymentTransactions.DDBTransaction>(transactions[0]);
}

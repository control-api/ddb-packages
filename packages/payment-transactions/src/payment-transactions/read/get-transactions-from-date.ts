import {ulid} from 'ulid';
import {find, fromDDBItem} from '@control-api/common-ddb';
import {PaymentTransactions} from '@control-api/types-ddb';
import {
  CARD_NUMBER_PREFIX,
  TRANSACTION_PREFIX,
  getTransactionHashKey,
  tableName,
} from '../../table-helpers';

type Params = {
  userId: string;
  cardId: string;
  time: string;
}

export async function getTransactionsFromDate({
  userId,
  cardId,
  time,
}: Params): Promise<PaymentTransactions.Transaction[]> {
  const fromTime = ulid(new Date(time).getTime());

  const params = {
    TableName: tableName,
    KeyConditionExpression: 'hash_key = :hash_key and range_key >= :range_key',
    ExpressionAttributeValues: {
      ':hash_key': getTransactionHashKey(userId),
      ':range_key': `${CARD_NUMBER_PREFIX}#${cardId}#${TRANSACTION_PREFIX}#${fromTime}`,
    },
    ScanIndexForward: false,
  };

  const ddbTransactions = await find<PaymentTransactions.DDBTransaction>(params);

  return ddbTransactions.map((item) => fromDDBItem<PaymentTransactions.DDBTransaction>(item));
}

import {find, fromDDBItem} from '@control-api/common-ddb';
import {PaymentTransactions} from '@control-api/types-ddb';
import {
  CARD_NUMBER_PREFIX,
  PAYMENTS_REPORT_PREFIX,
  getPaymentsReportHashKey,
  tableName,
} from '../../table-helpers';

type Params = {
  userId: string,
  cardId: string,
}

export async function getLastPaymentsReport({
  userId,
  cardId,
}: Params): Promise<PaymentTransactions.PaymentsReport | undefined> {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'hash_key = :hash_key and begins_with(range_key, :range_key)',
    ExpressionAttributeValues: {
      ':hash_key': getPaymentsReportHashKey(userId),
      ':range_key': `${CARD_NUMBER_PREFIX}#${cardId}#${PAYMENTS_REPORT_PREFIX}#`,
    },
    ScanIndexForward: false,
  };

  const paymentsReports = await find<PaymentTransactions.DDBPaymentsReport>(params);

  if (!paymentsReports?.length) {
    return;
  }

  return fromDDBItem<PaymentTransactions.DDBPaymentsReport>(paymentsReports[0]);
}

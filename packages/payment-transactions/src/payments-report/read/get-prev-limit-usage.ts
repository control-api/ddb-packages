import {find} from '@control-api/common-ddb';
import {PaymentTransactions} from '@control-api/types-ddb';
import {
  CARD_NUMBER_PREFIX,
  PAYMENTS_REPORT_PREFIX,
  getPaymentsReportHashKey,
  tableName,
} from '../../table-helpers';

export async function getPrevLimitUsage(
    userId: string,
    cardNumber: string,
): Promise<number> {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'hash_key = :hash_key and begins_with(range_key, :range_key)',
    ExpressionAttributeValues: {
      ':hash_key': getPaymentsReportHashKey(userId),
      ':range_key': `${CARD_NUMBER_PREFIX}#${cardNumber}#${PAYMENTS_REPORT_PREFIX}#`,
    },
    ScanIndexForward: false,
  };

  const paymentsReports = await find<PaymentTransactions.DDBPaymentsReport>(params);

  console.log('paymentsReports: ', paymentsReports);
  console.log('paymentsReports length: ', paymentsReports?.length);

  if (paymentsReports?.length < 1) {
    return 50000;
  }

  return paymentsReports[1].limitUsage;
}

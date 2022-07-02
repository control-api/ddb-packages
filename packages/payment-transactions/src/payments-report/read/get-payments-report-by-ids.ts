import {batchGet, fromDDBItem} from '@control-api/common-ddb';
import type {PaymentTransactions} from '@control-api/types-ddb';
import {getPaymentsReportFacetKey, tableName} from '../../table-helpers';

export async function getPaymentsReportByIds(
    userId: string,
    cardId: string,
    paymentReportIds: string[],
): Promise<PaymentTransactions.PaymentsReport[]> {
  const keys = paymentReportIds.map((paymentReportId) => {
    return getPaymentsReportFacetKey(userId, cardId, paymentReportId);
  });

  const DDBPaymentsReport = await batchGet<PaymentTransactions.DDBPaymentsReport>({
    tableName,
    keys,
  });

  return DDBPaymentsReport.map((item) => fromDDBItem<PaymentTransactions.DDBPaymentsReport>(item));
}

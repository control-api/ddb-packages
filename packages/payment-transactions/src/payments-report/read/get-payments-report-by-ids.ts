import {batchGet, fromDDBItem} from '@control-api/common-ddb';
import type {PaymentTransactions} from '@control-api/types-ddb';
import {getPaymentsReportFacetKey, tableName} from '../../table-helpers';

type Params = {
  userId: string,
  cardId: string,
  paymentReportIds: string[],
}

export async function getPaymentsReportByIds({
  userId,
  cardId,
  paymentReportIds,
}: Params): Promise<PaymentTransactions.PaymentsReport[]> {
  const keys = paymentReportIds.map((paymentReportId) => {
    return getPaymentsReportFacetKey(userId, cardId, paymentReportId);
  });

  const DDBPaymentsReport = await batchGet<PaymentTransactions.DDBPaymentsReport>({
    tableName,
    keys,
  });

  return DDBPaymentsReport.map((item) => fromDDBItem<PaymentTransactions.DDBPaymentsReport>(item));
}

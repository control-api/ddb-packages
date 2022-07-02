import {deleteMany} from '@control-api/common-ddb';
import {getPaymentsReportFacetKey, tableName} from '../../table-helpers';

export async function removePaymentsReportByIds(
    userId: string,
    cardId: string,
    paymentReportIds: string[],
): Promise<void> {
  const keys = paymentReportIds.map((paymentReportId) => {
    return getPaymentsReportFacetKey(userId, cardId, paymentReportId);
  });

  await deleteMany({
    TableName: tableName,
    Keys: keys,
  });
}

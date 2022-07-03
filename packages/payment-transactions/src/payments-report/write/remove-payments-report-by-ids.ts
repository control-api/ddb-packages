import {deleteMany} from '@control-api/common-ddb';
import {getPaymentsReportFacetKey, tableName} from '../../table-helpers';

type Params = {
  userId: string,
  cardId: string,
  paymentsReportIds: string[],
}

export async function removePaymentsReportByIds({
  userId,
  cardId,
  paymentsReportIds,
}: Params): Promise<void> {
  const keys = paymentsReportIds.map((paymentReportId) => {
    return getPaymentsReportFacetKey(userId, cardId, paymentReportId);
  });

  await deleteMany({
    TableName: tableName,
    Keys: keys,
  });
}

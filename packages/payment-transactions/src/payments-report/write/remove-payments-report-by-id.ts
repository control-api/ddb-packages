import {deleteOne} from '@control-api/common-ddb';
import {getPaymentsReportFacetKey, tableName} from '../../table-helpers';

export async function removePaymentsReportById(
    userId: string,
    cardId: string,
    paymentsReportId: string,
): Promise<void> {
  const params = {
    TableName: tableName,
    Key: getPaymentsReportFacetKey(userId, cardId, paymentsReportId),
  };

  await deleteOne(params);

  return;
}

import {deleteOne} from '@control-api/common-ddb';
import {getPaymentsReportFacetKey, tableName} from '../../table-helpers';

type Params = {
  userId: string,
  cardId: string,
  paymentsReportId: string,
}

export async function removePaymentsReportById({
  userId,
  cardId,
  paymentsReportId,
}: Params): Promise<void> {
  const params = {
    TableName: tableName,
    Key: getPaymentsReportFacetKey(userId, cardId, paymentsReportId),
  };

  await deleteOne(params);

  return;
}

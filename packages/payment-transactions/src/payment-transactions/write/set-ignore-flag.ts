import {updateMany} from '@control-api/common-ddb';
import {getTransactionFacetKey, tableName} from '../../table-helpers';

type Params = {
  userId: string,
  cardId: string,
  transactionIds: string[],
}

export async function setIgnoreFlagToTransactions({
  userId,
  cardId,
  transactionIds,
}: Params): Promise<void> {
  const itemsToUpdate = transactionIds.map((transactionId) => ({
    Key: getTransactionFacetKey(userId, cardId, transactionId),
    UpdateExpression:
      'set #ignoredInCalculation = :ignoredInCalculation, #updatedAt = :updatedAt',
    ExpressionAttributeNames: {
      '#ignoredInCalculation': 'ignoredInCalculation',
      '#updatedAt': 'updatedAt',
    },
    ExpressionAttributeValues: {
      ':ignoredInCalculation': true,
      ':updatedAt': new Date().toISOString(),
    },
  }));

  await updateMany({TableName: tableName, Items: itemsToUpdate});
}

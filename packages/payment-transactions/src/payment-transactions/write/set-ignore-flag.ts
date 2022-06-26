import {updateMany} from '@control-api/common-ddb';
import {getTransactionFacetKey, tableName} from '../../table-helpers';

export async function setIgnoreFlagToTransactions(
    userId: string,
    cardNumber: string,
    transactionIds: string[],
): Promise<void> {
  const itemsToUpdate = transactionIds.map((transactionId) => ({
    Key: getTransactionFacetKey(userId, cardNumber, transactionId),
    UpdateExpression:
      'set #ignoredInCalculation = :ignoredInCalculation set #updatedAt = :updatedAt',
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

import {find, fromDDBItem} from '@control-api/common-ddb';
import type {Users} from '@control-api/types-ddb';
import {getUserGSI1HK, getUserGSI1RK, indexTableName, tableName} from '../../table-helpers';

export async function getUserByEmail(email: string): Promise<Users.User | undefined> {
  const params = {
    TableName: tableName,
    IndexName: indexTableName,
    KeyConditionExpression: 'GSI1HK = :GSI1HK and GSI1RK = :GSI1RK',
    ExpressionAttributeValues: {
      ':GSI1HK': getUserGSI1HK(email),
      ':GSI1RK': getUserGSI1RK(),
    },
  };

  const users = await find<Users.DDBUserFacet>(params);

  if (!users.length) {
    return;
  }

  return fromDDBItem<Users.DDBUserFacet>(users[0]);
}

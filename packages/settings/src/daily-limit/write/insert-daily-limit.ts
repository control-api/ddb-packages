import {insertOne} from '@control-api/common-ddb';
import {ulid} from 'ulid';
import {getDailyLimitFacetKeys, getDailyLimitFacetType, tableName} from '../../table-helpers';

export async function insertDailyLimit(userId: string, limitPerDay: number): Promise<void> {
  const item = {
    id: ulid(),
    ...getDailyLimitFacetKeys(userId),
    facetType: getDailyLimitFacetType(),
    limitPerDay,
    createdAt: new Date().toISOString(),
  };

  await insertOne({TableName: tableName, Item: item});
}

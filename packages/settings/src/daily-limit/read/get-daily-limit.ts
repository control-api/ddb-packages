import {findOne} from '@control-api/common-ddb';
import type {Settings} from '@control-api/types-ddb';
import {getDailyLimitFacetKeys, tableName} from '../../table-helpers';

export async function getDailyLimit(userId: string): Promise<number> {
  const params = {
    TableName: tableName,
    Key: getDailyLimitFacetKeys(userId),
  };

  const item = await findOne<Settings.DDBLimitSettings>(params);

  if (!item) {
    return 0;
  }

  return item.limitPerDay;
}

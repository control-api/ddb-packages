import {findOne, fromDDBItem} from '@control-api/common-ddb';
import type {BankInfos} from '@control-api/types-ddb';
import {getTokenFacetKeys, tableName} from '../../table-helpers';

export async function getBankToken(userId: string): Promise<BankInfos.BankToken | undefined> {
  const params = {
    TableName: tableName,
    Key: getTokenFacetKeys(userId),
  };

  const bankToken = await findOne<BankInfos.DDBTokenFacet>(params);

  if (!bankToken) {
    return;
  }

  return fromDDBItem<BankInfos.DDBTokenFacet>(bankToken);
}

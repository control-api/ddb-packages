import {findOne, fromDDBItem} from '@control-api/common-ddb';
import type {BankInfos} from '@control-api/types-ddb';
import {getBankInfoFacetKeys, tableName} from '../../table-helpers';

export async function getBankInfo(userId: string): Promise<BankInfos.BankInfo | undefined> {
  const params = {
    TableName: tableName,
    Key: getBankInfoFacetKeys(userId),
  };

  const bankInfo = await findOne<BankInfos.DDBInfoFacet>(params);

  if (!bankInfo) {
    return;
  }

  return fromDDBItem<BankInfos.DDBInfoFacet>(bankInfo);
}

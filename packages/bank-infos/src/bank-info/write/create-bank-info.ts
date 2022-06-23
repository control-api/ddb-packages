import {insertOne} from '@control-api/common-ddb';
import type {BankInfos} from '@control-api/types-ddb';
import {getBankInfoFacetKeys, getBankInfoFacetType, tableName} from '../../table-helpers';

export async function createBankInfo(bankToken: BankInfos.BankInfo): Promise<void> {
  const {userId} = bankToken;

  const item = {
    ...getBankInfoFacetKeys(userId),
    ...bankToken,
    facetType: getBankInfoFacetType(),
  };

  await insertOne({TableName: tableName, Item: item});
}

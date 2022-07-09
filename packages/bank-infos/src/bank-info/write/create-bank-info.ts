import {insertOne} from '@control-api/common-ddb';
import type {BankInfos} from '@control-api/types-ddb';
import {getBankInfoFacetKeys, getBankInfoFacetType, tableName} from '../../table-helpers';

export async function createBankInfo(bankInfo: BankInfos.BankInfo): Promise<void> {
  const {userId, bankName} = bankInfo;

  const item = {
    ...getBankInfoFacetKeys(userId, bankName),
    ...bankInfo,
    facetType: getBankInfoFacetType(),
  };

  await insertOne({TableName: tableName, Item: item});
}

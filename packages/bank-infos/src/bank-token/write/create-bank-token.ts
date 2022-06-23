import {insertOne} from '@control-api/common-ddb';
import type {BankInfos} from '@control-api/types-ddb';
import {getTokenFacetKeys, getTokenFacetType, tableName} from '../../table-helpers';

export async function createBankToken(bankToken: BankInfos.BankToken): Promise<void> {
  const {userId} = bankToken;

  const item = {
    ...getTokenFacetKeys(userId),
    ...bankToken,
    facetType: getTokenFacetType(),
  };

  await insertOne({TableName: tableName, Item: item});
}

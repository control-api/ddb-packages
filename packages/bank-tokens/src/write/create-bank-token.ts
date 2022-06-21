import {insertOne} from '@control-api/common-ddb';
import type {BankTokens} from '@control-api/types-ddb';
import {getTokenFacetKeys, getTokenFacetType, tableName} from '../table-helpers';

export async function createBankToken(bankToken: BankTokens.BankToken): Promise<void> {
  const {userId, token} = bankToken;

  const item = {
    ...getTokenFacetKeys(userId, token),
    ...bankToken,
    facetType: getTokenFacetType(),
  };

  await insertOne({TableName: tableName, Item: item});
}
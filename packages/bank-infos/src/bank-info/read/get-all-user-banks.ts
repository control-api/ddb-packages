import {find, fromDDBItem} from '@control-api/common-ddb';
import type {BankInfos} from '@control-api/types-ddb';
import {BANK_NAME_PREFIX, getBankInfoHashKey, tableName} from '../../table-helpers';

export async function getAllUserBanks(userId: string): Promise<BankInfos.BankInfo[]> {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'hash_key = :hash_key and begins_with(range_key, :range_key)',
    ExpressionAttributeValues: {
      ':hash_key': getBankInfoHashKey(userId),
      ':range_key': `${BANK_NAME_PREFIX}#`,
    },
  };

  const bankInfos = await find<BankInfos.DDBInfoFacet>(params);

  return bankInfos.map((item) => fromDDBItem<BankInfos.DDBInfoFacet>(item));
}

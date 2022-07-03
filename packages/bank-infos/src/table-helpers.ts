import type {BankInfos, DDB} from '@control-api/types-ddb';

export const tableName = 'bank-infos';

export const USER_PREFIX = 'user';
export const TOKEN_PREFIX = 'token';
export const BANK_TOKEN_FACET_TYPE = 'Token';
export const INFO_PREFIX = 'info';
export const BANK_INFO_FACET_TYPE = 'Info';

//* * * Bank Token Facet Type * * *//
export function getTokenFacetKeys(userId: string): DDB.FacetKeys {
  return {
    hash_key: getTokenHashKey(userId),
    range_key: getTokenRangeKey(),
  };
}

export function getTokenHashKey(userId: string): string {
  return `${USER_PREFIX}#${userId}#${TOKEN_PREFIX}`;
}

export function getTokenRangeKey(): string {
  return TOKEN_PREFIX;
}

export function getTokenFacetType(): BankInfos.TokenFacet {
  return BANK_TOKEN_FACET_TYPE;
}

//* * * Bank Info Facet Type * * *//

// need adjustments to the bank-infos table
// for now we have the following structure:
// user -> one bank -> many cards
// we need to change this to:
// user -> many banks -> many cards

// Solution:
// 1. Change range_key from `info` to `bank_name#${bankName}#info`
// 2. Update relevant methods to use this new range_key
//
// Update authorizer:
//    1. Validate passed card number(s)
//    2. Add bank info of all the user's banks to event payload
// API side:
//    1. Get bankInfos from event
//    2. Add helper that will be searching bank info by card number in bankInfos array
//    3. Use already existing getCardId helper to get card id

export function getBankInfoFacetKeys(userId: string): DDB.FacetKeys {
  return {
    hash_key: getBankInfoHashKey(userId),
    range_key: getBankInfoRangeKey(),
  };
}

export function getBankInfoHashKey(userId: string): string {
  return `${USER_PREFIX}#${userId}#${INFO_PREFIX}`;
}

export function getBankInfoRangeKey(): string {
  return INFO_PREFIX;
}

export function getBankInfoFacetType(): BankInfos.InfoFacet {
  return BANK_INFO_FACET_TYPE;
}

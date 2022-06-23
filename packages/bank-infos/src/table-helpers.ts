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

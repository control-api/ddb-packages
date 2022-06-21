import type {BankTokens, DDB} from '@control-api/types-ddb';

export const tableName = 'bank-tokens';

export const TOKEN_PREFIX = 'token';
export const BANK_TOKEN_FACET_TYPE = 'Token';

export function getTokenFacetKeys(userId: string, token: string): DDB.FacetKeys {
  return {
    hash_key: getTokenHashKey(userId),
    range_key: getTokenRangeKey(token),
  };
}

export function getTokenHashKey(userId: string): string {
  return `${TOKEN_PREFIX}#${userId}`;
}

export function getTokenRangeKey(token: string): string {
  return `${TOKEN_PREFIX}#${token}`;
}

export function getTokenFacetType(): BankTokens.TokenFacet {
  return BANK_TOKEN_FACET_TYPE;
}

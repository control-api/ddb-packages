import type {DDB, Users} from '@control-api/types-ddb';

export const tableName = 'users';
export const indexTableName = 'users';

export const USER_PREFIX = 'user';
export const USER_FACET_TYPE = 'User';

export function getUserFacetKeys(userId: string, email: string): DDB.FacetKeys {
  return {
    hash_key: getUserHashKey(userId),
    range_key: getUserRangeKey(email),
  };
}

export function getUserHashKey(userId: string): string {
  return `${USER_PREFIX}#${userId}`;
}

export function getUserRangeKey(email: string): string {
  return `${USER_PREFIX}#${email}`;
}

export function getUserGSIFacetKeys(email: string): DDB.FacetGSIKeys {
  return {
    GSI1HK: getUserGSI1HK(email),
    GSI1RK: getUserGSI1RK(),
  };
}

export function getUserGSI1HK(email: string): string {
  return `${USER_PREFIX}#${email}`;
}

export function getUserGSI1RK(): string {
  return `${USER_PREFIX}#`;
}

export function getUserFacetType(): Users.UserFacet {
  return USER_FACET_TYPE;
}

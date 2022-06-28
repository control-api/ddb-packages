import {Settings} from '@control-api/types-ddb';

export const tableName = 'settings';

export const USER_PREFIX = 'user';
export const SETTINGS_PREFIX = 'settings';
export const DAILY_LIMIT_FACET = 'Limit';
export const DAILY_LIMIT_PREFIX = `daily-limit`;

// DailyLimitSettings Facet

export function getDailyLimitFacetKeys(userId: string) {
  return {
    hashKey: getDailyLimitHashKey(userId),
    rangeKey: getDailyLimitRangeKey(),
  };
}

export function getDailyLimitHashKey(userId: string): string {
  return `${USER_PREFIX}#${userId}#${SETTINGS_PREFIX}`;
}

export function getDailyLimitRangeKey(): string {
  return DAILY_LIMIT_PREFIX;
}

export function getDailyLimitFacetType(): Settings.DailyLimitSettingsFacet {
  return DAILY_LIMIT_FACET;
}

import {DDBItemDefaults} from './common-ddb-types';

export type DailyLimitSettingsFacet = 'Limit';

export type DDBLimitSettings = DailyLimitSettings & DDBItemDefaults;

export type DailyLimitSettings = {
  limitPerDay: number;
}

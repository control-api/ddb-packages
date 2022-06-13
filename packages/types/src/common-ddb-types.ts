import {UserFacet} from './users';

export type FacetType = UserFacet | string;

export type DDBItemDefaults = {
  hash_key: string;
  range_key: string;
  GSI1HK: string;
  GSI1RK: string;
  facetType: FacetType;
}

export type HashKey = 'hash_key' | `GSI${number}HK`;

export type RangeKey = 'range_key' | `GSI${number}RK`;

export type ItemWithoutHashRangeKeys<T> = Omit<T, HashKey & RangeKey>;

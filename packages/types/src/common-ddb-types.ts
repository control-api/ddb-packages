import {UserFacet} from './users';

export type FacetKeys = {
  hash_key: string;
  range_key: string;
}

export type FacetGSIKeys = {
  GSI1HK: string;
  GSI1RK: string;
}

export type FacetType = UserFacet | string;

export type DDBItemDefaults = {
  hash_key: string;
  range_key: string;
  GSI1HK?: string;
  GSI1RK?: string;
  facetType: FacetType;
}

export type HashKey = 'hash_key' | `GSI1HK`;

export type RangeKey = 'range_key' | `GSI1RK`;

export type ItemWithoutHashRangeKeys<T> = Omit<T, HashKey & RangeKey>;

export type ItemWithoutFacetTypeKey<T> = Omit<T, FacetType>;

export type ItemWithoutDDBDefaults<T> = Omit<T, HashKey & RangeKey & FacetType>;

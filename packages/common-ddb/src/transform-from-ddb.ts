import {unset} from 'lodash';
import {DDB} from '@control-api/types-ddb';

export function fromDDBItem<T>(item: T & DDB.DDBItemDefaults): DDB.ItemWithoutDDBDefaults<T> {
  stripHashRangeKeys(item);
  stripGSIHashRangeKeys(item);
  stripFacetTypeKey(item);

  return item;
}

export function stripHashRangeKeys<T>(item: T & DDB.DDBItemDefaults): DDB.ItemWithoutHashRangeKeys<T> {
  unset(item, 'hash_key');
  unset(item, 'range_key');

  return stripGSIHashRangeKeys<T>(item);
}

export function stripGSIHashRangeKeys<T>(item: T & DDB.DDBItemDefaults): DDB.ItemWithoutHashRangeKeys<T> {
  unset(item, `GSI1HK`);
  unset(item, `GSI1RK`);

  return item;
}

export function stripFacetTypeKey<T>(item: T & DDB.DDBItemDefaults): DDB.ItemWithoutFacetTypeKey<T> {
  unset(item, 'facetType');

  return item;
}

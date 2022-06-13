import {chunk, flatMap} from 'lodash';
import type {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import type {BatchGetItemOutput} from 'aws-sdk/clients/dynamodb';
import {batchGet as batch} from '../ddb';

const MAX_BATCH_GET_ITEMS = 100;

export type BatchGetParams = {
  tableName: string;
  keys: {[key: string]: DocumentClient.AttributeValue}[];
};

export async function batchGet<T>(params: BatchGetParams): Promise<T[]> {
  const paramsKeysChunks = chunk(params.keys, MAX_BATCH_GET_ITEMS);

  const items = await Promise.all(
      paramsKeysChunks.map((keyChunk) => {
        params.keys = keyChunk;

        return batch(getBatchParams(params));
      }),
  );

  return flatMap<BatchGetItemOutput, T>(
      items,
      (item) => item.Responses?.[params.tableName] as unknown as T[],
  );
}

export function getBatchParams(
    params: BatchGetParams,
): DocumentClient.BatchGetItemInput {
  const {tableName, keys} = params;
  return {RequestItems: {[tableName]: {Keys: keys}}};
}

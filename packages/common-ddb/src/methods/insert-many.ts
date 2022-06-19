import type {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {chunk} from 'lodash';
import pMap from 'p-map';
import {MAX_BATCH_WRITE_ITEMS, batchWrite} from '../ddb';

type PutRequestItem = Omit<DocumentClient.WriteRequest, 'DeleteRequest'>;

type InsertManyParams = {
  TableName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Items: any[];
};

export async function insertMany(
    params: InsertManyParams,
    retryCount = 1,
): Promise<DocumentClient.BatchWriteItemOutput[]> {
  const {TableName, Items} = params;
  const itemsChunks = chunk(Items, MAX_BATCH_WRITE_ITEMS);

  const paramsChunks = itemsChunks.map(
      (itemsChunk): DocumentClient.BatchWriteItemInput =>
        makePutRequestItems({TableName, Items: itemsChunk}),
  );

  return pMap(
      paramsChunks,
      (params): Promise<DocumentClient.BatchWriteItemOutput> => batchWrite(params, retryCount),
      {concurrency: 100, stopOnError: false},
  );
}

function makePutRequestItems(params: InsertManyParams): DocumentClient.BatchWriteItemInput {
  const {TableName, Items} = params;

  return {
    RequestItems: {
      [TableName]: Items.map((item): PutRequestItem => {
        return {
          PutRequest: {
            Item: item,
          },
        };
      }),
    },
  };
}


import type {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {chunk} from 'lodash';
import {MAX_BATCH_WRITE_ITEMS, batchWrite} from '../ddb';

type DeleteRequestItem = Omit<DocumentClient.WriteRequest, 'PutRequest'>;

type DeleteManyParams = {
  TableName: string;
  Keys: Record<string, unknown>[];
};

export async function deleteMany(
    params: DeleteManyParams,
    retryCount = 1,
): Promise<DocumentClient.BatchWriteItemOutput[]> {
  const {TableName, Keys} = params;
  const keysChunks = chunk(Keys, MAX_BATCH_WRITE_ITEMS);

  const paramsChunks = keysChunks.map(
      (keysChunk): DocumentClient.BatchWriteItemInput =>
        makeDeleteRequestItems({TableName, Keys: keysChunk}),
  );

  return Promise.all(
      paramsChunks.map(
          (params): Promise<DocumentClient.BatchWriteItemOutput> => batchWrite(params, retryCount),
      ),
  );
}

function makeDeleteRequestItems(params: DeleteManyParams): DocumentClient.BatchWriteItemInput {
  const {TableName, Keys} = params;

  return {
    RequestItems: {
      [TableName]: Keys.map((key): DeleteRequestItem => {
        return {
          DeleteRequest: {
            Key: key,
          },
        };
      }),
    },
  };
}

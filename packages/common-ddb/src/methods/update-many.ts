import type {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {chunk} from 'lodash';
import pMap from 'p-map';
import {MAX_BATCH_WRITE_ITEMS, transactionWrite} from '../ddb';

type ItemToUpdate = Omit<DocumentClient.Update, 'TableName'>

type TransactWriteItemsInput = Omit<DocumentClient.TransactWriteItemsInput, 'TransactItems'> & {
  TransactItems: Pick<DocumentClient.TransactWriteItem, 'Update'>[];
}

type UpdateManyParams = {
  TableName: string;
  Items: ItemToUpdate[];
}

export async function updateMany(
    params: UpdateManyParams,
): Promise<DocumentClient.TransactWriteItemsOutput[]> {
  const {TableName, Items} = params;
  const itemsChunks = chunk(Items, MAX_BATCH_WRITE_ITEMS);

  const paramsChunks = itemsChunks.map(
      (itemsChunk): TransactWriteItemsInput =>
        makeUpdateRequestItems({TableName, Items: itemsChunk}),
  );

  return pMap(
      paramsChunks,
      (params): Promise<DocumentClient.TransactWriteItemsOutput> => transactionWrite(params),
      {concurrency: 100, stopOnError: false},
  );
}

function makeUpdateRequestItems(params: UpdateManyParams): TransactWriteItemsInput {
  const {TableName, Items} = params;

  return {
    TransactItems: Items.map((item: ItemToUpdate) => {
      return {
        Update: {
          TableName,
          ...item,
        },
      };
    }),
  };
}

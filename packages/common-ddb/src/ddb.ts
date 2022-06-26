import type {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {DynamoDB} from 'aws-sdk';

export const MAX_BATCH_WRITE_ITEMS = 25;

const ddb = new DynamoDB.DocumentClient();

export async function get(
    params: DocumentClient.GetItemInput,
): Promise<DocumentClient.GetItemOutput> {
  return ddb.get(params).promise();
}

export async function query(
    params: DocumentClient.QueryInput,
): Promise<DocumentClient.QueryOutput> {
  return ddb.query(params).promise();
}

export async function put(
    params: DocumentClient.PutItemInput,
): Promise<DocumentClient.PutItemOutput> {
  return ddb.put(params).promise();
}

export async function upsert(
    params: DocumentClient.UpdateItemInput,
): Promise<DocumentClient.UpdateItemOutput> {
  return ddb.update(params).promise();
}

export async function remove(
    params: DocumentClient.DeleteItemInput,
): Promise<DocumentClient.DeleteItemOutput> {
  return ddb.delete(params).promise();
}

export async function batchGet(
    params: DocumentClient.BatchGetItemInput,
): Promise<DocumentClient.BatchGetItemOutput> {
  return ddb.batchGet(params).promise();
}

export async function scan(params: DocumentClient.ScanInput): Promise<DocumentClient.ScanOutput> {
  return ddb.scan(params).promise();
}

export async function batchWrite(
    params: DocumentClient.BatchWriteItemInput,
    failedItems = 0,
): Promise<DocumentClient.BatchWriteItemOutput> {
  if (failedItems > 10) {
    failedItems = 10;
  }

  const results = await ddb.batchWrite(params).promise();

  const isAnyOpFailed = Boolean(Object.keys(results?.UnprocessedItems || {}).length);

  if (failedItems > 0 && isAnyOpFailed) {
    return batchWrite(
        {
          RequestItems:
          results.UnprocessedItems as DocumentClient.BatchWriteItemInput['RequestItems'],
        },
        failedItems - 1,
    );
  }

  return results;
}

export async function transactionWrite(
    params: DocumentClient.TransactWriteItemsInput,
): Promise<DocumentClient.TransactWriteItemsOutput> {
  return ddb.transactWrite(params).promise();
}

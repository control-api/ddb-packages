import type {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import {query} from '../ddb';

export async function find<T>({
  params,
}: {
  params: DocumentClient.QueryInput;
  key: DynamoDB.DocumentClient.Key | undefined;
}): Promise<T[]> {
  const {Items} = await query(params);

  return Items as T[];
}

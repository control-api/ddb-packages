import type {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';
import {query} from '../ddb';

export async function find<T>({
  params,
}: {
  params: DocumentClient.QueryInput;
  key: DocumentClient.Key | undefined;
}): Promise<T[]> {
  const {Items} = await query(params);

  return Items as T[];
}

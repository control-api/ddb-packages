import {ulid} from 'ulid';
import {insertMany} from '@control-api/common-ddb';
import {PaymentTransactions} from '@control-api/types-ddb';
import {
  getPaymentsReportFacetKey,
  getPaymentsReportFacetType,
  tableName,
} from '../../table-helpers';

type Params = {
  userId: string,
  cardNumber: string,
  paymentsReports: PaymentTransactions.PaymentsReport[],
}

export async function insertPaymentsReports(
    {userId, cardNumber, paymentsReports}: Params,
): Promise<void> {
  const ddbPaymentsReports: PaymentTransactions.DDBPaymentsReport[] = paymentsReports
      .map((paymentsReport) => {
        const id = ulid(new Date(paymentsReport.lastTransactionTime).getTime());

        const ddbPaymentsReport: PaymentTransactions.DDBPaymentsReport = {
          ...getPaymentsReportFacetKey(userId, cardNumber, id),
          facetType: getPaymentsReportFacetType(),
          ...paymentsReport,
          createdAt: new Date().toISOString(),
          id,
        };

        return ddbPaymentsReport;
      });

  await insertMany({TableName: tableName, Items: ddbPaymentsReports});
}

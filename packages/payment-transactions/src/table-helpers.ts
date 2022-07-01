import {DDB, PaymentTransactions} from '@control-api/types-ddb';

export const tableName = 'payment_transactions';

export const USER_PREFIX = 'user';
export const TRANSACTION_FACET_TYPE = 'Transaction';
export const TRANSACTION_PREFIX = 'transaction';
export const CARD_NUMBER_PREFIX = 'card';
export const PAYMENTS_REPORT_PREFIX = 'payments_report';
export const PAYMENTS_REPORT_FACET = 'Payments-Report';

// / Transaction Facet

export function getTransactionFacetKey(
    userId: string,
    cardNumber: string,
    transactionId: string,
): DDB.FacetKeys {
  return {
    hash_key: getTransactionHashKey(userId),
    range_key: getTransactionRangeKey(cardNumber, transactionId),
  };
}

export function getTransactionHashKey(userId: string): string {
  return `${USER_PREFIX}#${userId}#${TRANSACTION_PREFIX}`;
}

export function getTransactionRangeKey(cardNumber: string, transactionId: string): string {
  return `${CARD_NUMBER_PREFIX}#${cardNumber}#${TRANSACTION_PREFIX}#${transactionId}`;
}

export function getTransactionFacetType(): PaymentTransactions.TransactionFacet {
  return TRANSACTION_FACET_TYPE;
}

// / Payments Report Facet

export function getPaymentsReportFacetKey(
    userId: string,
    cardNumber: string,
    paymentsReportId: string,
): DDB.FacetKeys {
  return {
    hash_key: getPaymentsReportHashKey(userId),
    range_key: getPaymentsReportRangeKey(cardNumber, paymentsReportId),
  };
}

export function getPaymentsReportHashKey(userId: string): string {
  return `${USER_PREFIX}#${userId}#${PAYMENTS_REPORT_PREFIX}`;
}

export function getPaymentsReportRangeKey(cardNumber: string, paymentsReportId: string): string {
  return `${CARD_NUMBER_PREFIX}#${cardNumber}#${PAYMENTS_REPORT_PREFIX}#${paymentsReportId}}`;
}

export function getPaymentsReportFacetType(): PaymentTransactions.PaymentsReportFacet {
  return PAYMENTS_REPORT_FACET;
}

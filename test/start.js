'use strict';

import fs from 'fs';
import transactions from './transactions.json';

const locals = {
  appVersion: 'V1.0',
  org: 'Kard'
};

export default function() {
  const byAccountId = transactions.data.reduce((acc, tx) => {
    if (!acc[tx.referringPartnerAccountId]) {
      return {
        ...acc,
        [tx.referringPartnerAccountId]: [tx]
      };
    }
    acc[tx.referringPartnerAccountId].push(tx);
    return acc;
  }, {});

  const { body, result } = generateBody(byAccountId);
  const fileContent = [
    appendHeader(result.lines),
    ...body,
    appendFooter(result.totalUserCommission, result.totalAmount)
  ].join('\n');
  writeToFile(fileContent);

  console.info('--- all done ✅---');
}

const appendHeader = lines => {
  return [
    locals.appVersion,
    'STARTFEED',
    locals.org,
    new Date().toISOString(),
    lines
  ].join('|');
};

const appendFooter = (totalUserCommission, totalAmount) => {
  return [
    'ENDFEED',
    totalUserCommission,
    totalAmount
  ].join('|');
};

const appendTransaction = (lineNumber, transaction) => {
  return [
    lineNumber,
    transaction._id,
    transaction.referringPartnerAccountId,
    transaction.offerId,
    transaction.status,
    transaction.transactionDate,
    transaction.merchantName,
    transaction.commissionToUserInCents,
    transaction.transactionAmountInCents,
    transaction.source
  ].join('|');
};

const generateBody = data => {
  const body = [];
  const result = {
    lines: 0,
    totalUserCommission: 0,
    totalAmount: 0
  };

  Object.entries(data)
    .forEach(([accountId, transactions]) => {
      const chunk = [];
      let accountCommission = 0;
      result.lines += 1;
      const accountLineNumber = result.lines;
      transactions.forEach(tx => {
        result.lines += 1;
        result.totalUserCommission += tx.commissionToUserInCents;
        result.totalAmount += tx.transactionAmountInCents;
        if (tx.status === 'SETTLED') {
          accountCommission += tx.commissionToUserInCents;
        }
        chunk.push(appendTransaction(result.lines, tx));
      });
      chunk.unshift(`${accountLineNumber}||${accountId}||AG|||${accountCommission}||`);
      body.push(...chunk);
    });

  return { body, result };
};

const writeToFile = (content, filename = 'transactions.txt') => {
  // use sync operation for now
  fs.writeFileSync(filename, content, { encoding: 'utf8' });
};

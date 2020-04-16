import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const getTotIncome = await this.find({
      where: {
        type: 'income',
      },
    });

    const getSumIncome = getTotIncome.reduce((total, cur) => {
      return total + cur.value;
    }, 0);

    const getTotOutcome = await this.find({
      where: {
        type: 'outcome',
      },
    });

    const getSumOutcome = getTotOutcome.reduce((total, cur) => {
      return total + cur.value;
    }, 0);

    return {
      income: getSumIncome,
      outcome: getSumOutcome,
      total: getSumIncome - getSumOutcome,
    };
  }
}

export default TransactionsRepository;

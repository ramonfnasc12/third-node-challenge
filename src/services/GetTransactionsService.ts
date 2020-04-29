import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface TransactionReturn {
  id: string;
  title: string;
  value: number;
  type: string;
  category: string;
  date: Date;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Return {
  transactions: TransactionReturn[];
  balance: Balance;
}

export default class GetTransactionsService {
  public async execute(): Promise<Return> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const balance = await transactionsRepository.getBalance();

    const transactions = await transactionsRepository.find({
      relations: ['category'],
    });

    const changedTransactions: TransactionReturn[] | void = [];

    transactions.forEach(cur => {
      changedTransactions.push({
        id: cur.id,
        title: cur.title,
        value: cur.value,
        type: cur.type,
        category: cur.category.title,
        date: cur.updated_at,
      });
    });

    return {
      transactions: changedTransactions,
      balance,
    };
  }
}

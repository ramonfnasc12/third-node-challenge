import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import GetTransactionService from './GetTransactionsService';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);
    const categoryRepository = getRepository(Category);
    const getTransactionService = new GetTransactionService();

    if (type === 'outcome') {
      const transactions = await getTransactionService.execute();
      const { total } = transactions.balance;

      if (value > total) {
        throw new AppError("You don't have enough balance", 400);
      }
    }

    const categoryExists = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    let category_id = categoryExists?.id;

    if (!categoryExists) {
      const newCategory = categoryRepository.create({ title: category });
      await categoryRepository.save(newCategory);
      category_id = newCategory.id;
    }

    const newTransaction = transactionRepository.create({
      title,
      value,
      type,
      category_id,
    });

    await transactionRepository.save(newTransaction);

    return newTransaction;
  }
}

export default CreateTransactionService;

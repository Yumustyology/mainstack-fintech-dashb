import { getRequest } from '../service/apiRequests';
import type {
  UserResponse,
  WalletResponse,
  TransactionsResponse,
} from '../types/api';

export const getUser = async (): Promise<UserResponse> => {
  return getRequest<UserResponse>('/user');
};

export const getWallet = async (): Promise<WalletResponse> => {
  return getRequest<WalletResponse>('/wallet');
};

export const getTransactions = async (): Promise<TransactionsResponse> => {
  return getRequest<TransactionsResponse>('/transactions');
};

export default {
  getUser,
  getWallet,
  getTransactions,
};

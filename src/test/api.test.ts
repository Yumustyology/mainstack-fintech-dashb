import { describe, it, expect, vi, beforeEach } from "vitest";
import * as apiRequests from "@/lib/service/apiRequests";
import { getTransactions, getUser, getWallet } from "@/lib/actions";
import type {
  UserResponse,
  WalletResponse,
  TransactionsResponse,
} from "@/lib/types/api";

describe("actions", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("getUser returns user data", async () => {
    const user: UserResponse = {
      first_name: "Olivier",
      last_name: "Jones",
      email: "olivierjones@gmail.com",
    };

    vi.spyOn(apiRequests, "getRequest").mockResolvedValueOnce(user);

    const res = await getUser();
    expect(res).toEqual(user);
  });

  it("getWallet returns wallet data", async () => {
    const wallet: WalletResponse = {
      balance: 750.56,
      total_payout: 500,
      total_revenue: 1250.56,
      pending_payout: 0,
      ledger_balance: 500,
    };

    vi.spyOn(apiRequests, "getRequest").mockResolvedValueOnce(wallet);

    const res = await getWallet();
    expect(res).toEqual(wallet);
  });

  it("getTransactions returns array of transactions", async () => {
    const tx: TransactionsResponse = [
      {
        amount: 100,
        status: "successful",
        type: "deposit",
        date: "2022-01-01",
      },
    ];

    vi.spyOn(apiRequests, "getRequest").mockResolvedValueOnce(tx);

    const res = await getTransactions();
    expect(res).toEqual(tx);
  });
});

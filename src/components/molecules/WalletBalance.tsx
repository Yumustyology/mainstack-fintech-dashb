import { Button } from "../ui/button";
import useSWR from 'swr'
import { getWallet } from '@/lib/actions'
import type { WalletResponse } from '@/lib/types/api'
import { formatUSD } from '@/lib/utils'

const fetcher = async (): Promise<WalletResponse> => {
  return getWallet()
}

const WalletBalance = () => {
  const { data, error } = useSWR<WalletResponse>('wallet', fetcher)

  return (
    <div className="flex items-center gap-16 font-degular mb-6">
      <div>
        <h2 className="text-ms-gray-400 text-sm mb-2 font-medium">Available Balance</h2>
        <h1 className="text-ms-black-300 text-4xl font-bold">{formatUSD(data?.balance)}</h1>
      </div>
      <Button className="h-[52px] py-3.5 px-7 rounded-full w-[167px] bg-ms-black-300">Withdraw</Button>
      {error && <div className="text-sm text-red-500">Failed to load wallet</div>}
    </div>
  );
};

export default WalletBalance;

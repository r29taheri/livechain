import { useAccount } from 'wagmi';

import { ConnectWallet, DisconnectWallet } from '..';

export const WalletAuth = () => {
  const { isConnected } = useAccount();

  return isConnected ? <DisconnectWallet /> : <ConnectWallet />;
};

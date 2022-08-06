import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { ConnectWallet, DisconnectWallet } from '..';

export const WalletAuth = () => {
  const { isConnected } = useAccount();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isConnected);
  }, [isConnected]);

  return isLoggedIn ? <DisconnectWallet /> : <ConnectWallet />;
};

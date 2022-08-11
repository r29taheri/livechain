import { useCallback, useEffect, useState } from 'react';

import { useAccount } from 'wagmi';
import { useMountedState } from 'react-use';

import { FullscreenSpinner, ConnectWallet, DisconnectWallet } from '..';

export const WalletAuth = () => {
  const { isConnected } = useAccount();
  const isMounted = useMountedState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoading = useCallback(
    (isLoading: boolean) => {
      if (isMounted()) {
        setIsLoading(isLoading);
      }
    },
    [isMounted]
  );

  useEffect(() => {
    setIsLoggedIn(isConnected);
  }, [isConnected]);

  if (isLoading) return <FullscreenSpinner />;

  return isLoggedIn && !isLoading ? (
    <DisconnectWallet />
  ) : (
    <ConnectWallet handleLoading={handleLoading} />
  );
};

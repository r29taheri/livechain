import Link from 'next/link';
import Cookies from 'js-cookie';
import { useDisconnect } from 'wagmi';
import { HiOutlineLogout } from 'react-icons/hi';
import { Button, ButtonGroup } from '@chakra-ui/react';

import { userApi } from '@services/index';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const DisconnectWallet = () => {
  const router = useRouter();
  const { disconnectAsync } = useDisconnect();

  const handleDisconnect = async () => {
    try {
      await disconnectAsync();
      await userApi.logout();
      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const address = Cookies.get('address');
    if (!address) {
      disconnectAsync();
    }
  }, [disconnectAsync]);

  return (
    <ButtonGroup>
      <Link href="/dashboard">
        <Button>Dashboard</Button>
      </Link>
      <Button leftIcon={<HiOutlineLogout />} onClick={() => handleDisconnect()}>
        Disconnect
      </Button>
    </ButtonGroup>
  );
};

import Link from 'next/link';
import { useDisconnect } from 'wagmi';
import { HiOutlineLogout } from 'react-icons/hi';
import { Button, ButtonGroup } from '@chakra-ui/react';

export const DisconnectWallet = () => {
  const { disconnect } = useDisconnect();

  return (
    <ButtonGroup>
      <Link href="/dashboard">
        <Button>Dashboard</Button>
      </Link>
      <Button leftIcon={<HiOutlineLogout />} onClick={() => disconnect()}>
        Disconnect
      </Button>
    </ButtonGroup>
  );
};

import Link from 'next/link';
import { User } from '@prisma/client';
import { Button, Center, Text } from '@chakra-ui/react';

interface Props {
  user: Partial<User>;
}

export const StartSession = ({ user }: Props) => (
  <Center flexDir="column">
    {user.username ? (
      <>
        <Text>For start a session please click on below button</Text>
        <Link href="/broadcast">
          <Button mt="10px">Start Session</Button>
        </Link>
      </>
    ) : (
      <Text noOfLines={1}>
        Before start session, you need to update your data.
      </Text>
    )}
  </Center>
);

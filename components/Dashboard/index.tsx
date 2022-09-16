import { Container } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import { StartSession } from './StartSession';
import { UpdateUser } from './UpdateUser';
import { User } from '@prisma/client';
import { Card } from '..';

interface Props {
  isLoading: boolean;
  user: Partial<User>;
  handleUpdateUser: (data: Partial<User>) => void;
}

export const Dashboard = ({ user, isLoading, handleUpdateUser }: Props) => {
  return (
    <Container>
      <Card w="100%">
        <Tabs isFitted>
          <TabList>
            <Tab>Live</Tab>
            <Tab>Update</Tab>
            <Tab>Upload Media</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <StartSession user={user} />
            </TabPanel>
            <TabPanel>
              <UpdateUser
                user={user}
                isLoading={isLoading}
                handleUpdateUser={handleUpdateUser}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Container>
  );
};

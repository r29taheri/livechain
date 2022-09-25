import { Container } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import { User } from '@prisma/client';

import { StartSession } from './StartSession';
import { UpdateUser } from './UpdateUser';
import { UploadMedia } from './UploadMedia';
import { Card } from '..';
import { FieldValues } from 'react-hook-form';

interface Props {
  isLoading: boolean;
  user: Partial<User>;
  handleUpload: (data: FieldValues) => void;
  handleUpdateUser: (data: Partial<User>) => void;
}

export const Dashboard = ({
  user,
  isLoading,
  handleUpload,
  handleUpdateUser,
}: Props) => {
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
            <TabPanel>
              <UploadMedia
                isLoading={isLoading}
                handleUpload={handleUpload}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Container>
  );
};

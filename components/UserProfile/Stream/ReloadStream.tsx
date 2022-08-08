import {
  Box,
  Text,
  Flex,
  Alert,
  Center,
  Button,
  AlertIcon,
} from '@chakra-ui/react';

interface Props {
  refetch: () => void;
}

export const ReloadStream = ({ refetch }: Props) => (
  <Box>
    <Alert display="block" status="warning">
      <Flex>
        <AlertIcon />
        <Text>
          There is no live stream yet, click on the button below to recheck.
        </Text>
      </Flex>
      <Center mt="10px">
        <Button colorScheme="orange" onClick={refetch}>
          Refetch Data
        </Button>
      </Center>
    </Alert>
  </Box>
);

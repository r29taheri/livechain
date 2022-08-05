import { Box, Center, Flex, Text } from '@chakra-ui/react';

import styles from './LiveBadge.module.scss';

export const LiveBadge = () => (
  <Flex
    p="14px"
    top="15px"
    right="15px"
    rounded="8px"
    pos="absolute"
    zIndex="docked"
    bgColor="#000000ba"
    alignItems="center"
    justifyContent="space-between"
  >
    <Text color="white" mr="15px">
      LIVE
    </Text>
    <Center w="12px" h="12px" rounded="full" zIndex="docked" bgColor="#d50000">
      <Box
        boxSize="full"
        rounded="full"
        bgColor="#ff8a80"
        className={styles.recorder}
      />
    </Center>
  </Flex>
);

import React from 'react';
import { Flex, List } from '@chakra-ui/react';

interface Props {
  onClick?: () => void;
}

export const Nav = ({ onClick }: Props) => (
  <Flex
    as={List}
    onClick={onClick}
    top={{ base: 'auto', lg: '50%' }}
    left={{ base: 'auto', lg: '50%' }}
    flexDir={{ base: 'column', lg: 'row' }}
    pos={{ base: 'relative', lg: 'absolute' }}
    alignItems={{ base: 'center', lg: 'center' }}
    transform={{ base: 'none', lg: 'translate(-50%, -50%)' }}
  ></Flex>
);

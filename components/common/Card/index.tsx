import React from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
  [key: string]: any;
  children: React.ReactNode;
}

export const Card = ({ children, ...props }: Props) => {
  return (
    <Box
      p="10px"
      {...props}
      rounded="10px"
      bgColor="white"
      boxShadow="0px 1px 3px 0px #939393"
    >
      {children}
    </Box>
  );
};

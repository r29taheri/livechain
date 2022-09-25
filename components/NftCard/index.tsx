import {
  Box,
  Tag,
  Flex,
  Text,
  Avatar,
  Heading,
  TagLabel,
  Container,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Image from 'next/image';
import { BiLinkExternal } from 'react-icons/bi';

import { ASSET_PREFIX } from '@constants/index';
import { Media, User } from '@prisma/client';
import { Card } from '@components/common';
import Link from 'next/link';

interface MediaWithUser extends Media {
  owner: User;
}

interface Props {
  data: MediaWithUser;
}

export const NftCard = ({ data }: Props) => {
  return (
    <Container maxW="4xl">
      <Card overflow="hidden">
        <Box mb="10px">
          <Flex alignItems="center" justifyContent="space-between">
            <Heading>{data.title}</Heading>
            <ChakraLink href={`${data.nftData?.tokenURI}`} isExternal>
              Open NFT metadata
              <Box display="inline" as={BiLinkExternal} mx="2px" />
            </ChakraLink>
          </Flex>
          <Box pos="relative">
            <Image
              width="100%"
              height="100%"
              alt={data.title}
              layout="responsive"
              src={`${ASSET_PREFIX}/${data.key}`}
            />
          </Box>
          <Link href={`/${data.owner.username}`}>
            <Tag
              my="10px"
              size="lg"
              cursor="pointer"
              colorScheme="red"
              borderRadius="full"
            >
              <Avatar size="xs" name={data.owner.name || ''} ml="-8px" mr={2} />
              <TagLabel>{data.owner.name}</TagLabel>
            </Tag>
          </Link>
          <Text>{data.description}</Text>
        </Box>
      </Card>
    </Container>
  );
};

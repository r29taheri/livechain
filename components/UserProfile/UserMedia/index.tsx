import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { Media } from '@prisma/client';
import Image from 'next/image';

import { ASSET_PREFIX } from '@constants/index';
import { MediaModal } from './MediaModal';
import { useState } from 'react';

interface Props {
  media: Media[];
  isLoading: boolean;
  handleCreateNft: (media: Media) => void;
}
export const UserMedia = ({ media, isLoading, handleCreateNft }: Props) => {
  const [selectedItem, setSelectedItem] = useState<Media | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelectItem = (media: Media) => {
    setSelectedItem(media);
    onOpen();
  };

  return (
    <>
      <SimpleGrid columns={{ sm: 2, md: 4 }} spacing={10} my="10px">
        {media.map((item) => (
          <Box
            key={item.id}
            pos="relative"
            cursor="pointer"
            transition="300ms"
            _hover={{ opacity: 0.7 }}
            onClick={() => handleSelectItem(item)}
          >
            <Image
              width="100%"
              height="100%"
              alt={item.title}
              layout="responsive"
              src={`${ASSET_PREFIX}/${item.thumbnail || item.key}`}
            />
          </Box>
        ))}
      </SimpleGrid>
      <MediaModal
        isOpen={isOpen}
        onClose={onClose}
        media={selectedItem}
        isLoading={isLoading}
        handleCreateNft={handleCreateNft}
      />
    </>
  );
};

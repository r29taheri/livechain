import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Text,
  Divider,
} from '@chakra-ui/react';
import { Media } from '@prisma/client';
import Image from 'next/image';

import { ASSET_PREFIX } from '@constants/index';
import ReactPlayer from 'react-player';

interface Props {
  isOpen: boolean;
  media: Media | null;
  onClose: () => void;
}

export const MediaModal = ({ media, isOpen, onClose }: Props) => {
  if (!media) return null;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{media.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb="10px">
              {media.type === 'image' ? (
                <Image
                  width="100%"
                  height="100%"
                  alt={media.title}
                  layout="responsive"
                  src={`${ASSET_PREFIX}/${media.key}`}
                />
              ) : (
                <ReactPlayer
                  controls
                  width="100%"
                  height="100%"
                  url={`${ASSET_PREFIX}/${media.key}`}
                />
              )}
            </Box>
            <Divider />
            <Text fontSize="md" mt="10px">
              {media.description}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Make it NFT</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

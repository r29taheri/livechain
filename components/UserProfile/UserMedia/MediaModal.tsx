import {
  Box,
  Text,
  Modal,
  Button,
  Divider,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import { Media } from '@prisma/client';
import Image from 'next/image';

import { ASSET_PREFIX } from '@constants/index';
import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';

interface Props {
  isOpen: boolean;
  isLoading: boolean;
  media: Media | null;
  onClose: () => void;
  handleCreateNft: (media: Media) => void;
}

export const MediaModal = ({
  media,
  isOpen,
  onClose,
  isLoading,
  handleCreateNft,
}: Props) => {
  const toast = useToast();
  const router = useRouter();

  const handleNft = (media: Media) => {
    if (media.type === 'video') {
      toast({
        status: 'info',
        duration: 5000,
        isClosable: true,
        title: 'Currently is not available to create video NFT.',
      });
    } else if (media.nftData) {
      router.push(`/nft/${media.id}`);
    } else {
      handleCreateNft(media);
    }
  };

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
            <Button
              variant="ghost"
              isLoading={isLoading}
              onClick={() => handleNft(media)}
            >
              {media.nftData ? 'Open NFT' : 'Make it NFT'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

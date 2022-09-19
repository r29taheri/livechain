import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Spinner, FormLabel, FormControl, Text } from '@chakra-ui/react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import { getFileType } from '@helper/getFileType';
import { PreviewFile } from './Preview';

interface Props {
  name: string;
  label: string;
  [key: string]: any;
  isLoading?: boolean;
  isInavlid?: boolean;
  handleFile: (file: File) => void;
  register: UseFormRegister<FieldValues>;
}

export const Uploader = ({
  name,
  label,
  register,
  isLoading,
  isInavlid,
  handleFile,
  ...props
}: Props) => {
  const [preview, setPreview] = useState({ type: '', url: '' });

  const handlePreview = (file: File) => {
    const fileType = file.type;
    const url = URL.createObjectURL(file);
    const type = getFileType(fileType);

    setPreview({ type, url });
  };

  const onDrop = (acceptedFiles: File[]) => {
    console.info('acceptedFiles', acceptedFiles);
    handlePreview(acceptedFiles[0]);
    handleFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    // accept: {
    //   'image/jpeg': [],
    //   'image/png': [],
    //   'image/jpg': [],
    //   'audio/mpeg3': ['.mp4'],
    // },
  });

  return (
    <FormControl isInvalid={isInavlid}>
      <FormLabel htmlFor={name}>{label}:</FormLabel>
      <Box pos="relative" {...getRootProps()}>
        <input {...props} {...getInputProps()} {...register(name)} />
        {isLoading && (
          <Spinner size="xs" top="15px" pos="absolute" right="10px" />
        )}
        <Box
          p="18px"
          mb="15px"
          rounded="4px"
          fontSize="large"
          color="gray.500"
          cursor="pointer"
          transition="150ms"
          bgColor="gray.100"
          textAlign="center"
          border="1px dashed"
          borderColor="gray.300"
          _hover={{ bgColor: 'gray.200' }}
        >
          {preview.url ? (
            <PreviewFile url={preview.url} type={preview.type} />
          ) : (
            <Text>
              Drag &apos;n&apos; drop some files here, or click to select files
            </Text>
          )}
        </Box>
      </Box>
    </FormControl>
  );
};

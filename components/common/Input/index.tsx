import {
  Box,
  Spinner,
  FormLabel,
  FormControl,
  Input as ChakraInput,
} from '@chakra-ui/react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  [key: string]: any;
  isLoading?: boolean;
  isInavlid?: boolean;
  register: UseFormRegister<FieldValues>;
}

export const Input = ({
  name,
  label,
  register,
  isLoading,
  isInavlid,
  ...props
}: Props) => (
  <FormControl isInvalid={isInavlid}>
    <FormLabel htmlFor="name">{label}:</FormLabel>
    <Box pos="relative">
      <ChakraInput mb="10px" variant="filled" {...register(name)} {...props} />
      {isLoading && (
        <Spinner size="xs" top="15px" pos="absolute" right="10px" />
      )}
    </Box>
  </FormControl>
);

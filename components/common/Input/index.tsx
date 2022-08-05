import { Box, Input as ChakraInput, Text } from '@chakra-ui/react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  [key: string]: any;
  isInavlid?: boolean;
  register: UseFormRegister<FieldValues>;
}

export const Input = ({
  name,
  label,
  register,
  isInavlid,
  ...props
}: Props) => (
  <Box>
    <Text mb="8px">{label}:</Text>
    <ChakraInput
      mb="10px"
      {...props}
      variant="filled"
      {...register(name)}
      isInvalid={isInavlid}
    />
  </Box>
);

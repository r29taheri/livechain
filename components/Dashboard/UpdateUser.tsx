import React from 'react';
import * as yup from 'yup';
import { Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useCheckExist } from '@hooks/useCheckExist';
import { User } from '@prisma/client';
import { Input } from '..';

interface Props {
  isLoading: boolean;
  user: Partial<User>;
  handleUpdateUser: (data: Partial<User>) => void;
}

const schema = yup
  .object()
  .shape({
    name: yup.string(),
    username: yup
      .string()
      .min(4)
      .matches(/^[a-zA-Z0-9_]{3,}[a-zA-Z]+[0-9]*$/, 'username is not valid'),
    email: yup.string().email(),
  })
  .required();

export const UpdateUser = ({ user, isLoading, handleUpdateUser }: Props) => {
  const {
    isInvalid: isInvalidUsername,
    isChecking: isCheckingUsername,
    handleCheck: handleCheckUsername,
  } = useCheckExist({
    field: 'username',
    address: user.address!,
  });
  const {
    isInvalid: isInvalidEmail,
    isChecking: isCheckingEmail,
    handleCheck: handleCheckEmail,
  } = useCheckExist({
    field: 'email',
    address: user.address!,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(handleUpdateUser)}>
      <Input
        name="name"
        label="Name"
        register={register}
        defaultValue={user.name}
        isInvalid={!!errors.name}
      />
      <Input
        name="username"
        label="Username"
        register={register}
        defaultValue={user.username}
        isLoading={isCheckingUsername}
        isDisabled={isCheckingUsername}
        isInvalid={!!errors.Username || isInvalidUsername}
        onBlur={(e: React.FormEvent<HTMLInputElement>) =>
          handleCheckUsername(e.currentTarget.value)
        }
      />
      <Input
        name="email"
        label="Email"
        register={register}
        defaultValue={user.email}
        isLoading={isCheckingEmail}
        isDisabled={isCheckingEmail}
        isInvalid={!!errors.email || isInvalidEmail}
        onBlur={(e: React.FormEvent<HTMLInputElement>) =>
          handleCheckEmail(e.currentTarget.value)
        }
      />

      <Button
        type="submit"
        variant="outline"
        colorScheme="green"
        isLoading={isLoading}
        isDisabled={isInvalidEmail || isInvalidUsername}
      >
        Update
      </Button>
    </form>
  );
};

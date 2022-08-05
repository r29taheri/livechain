import React from 'react';
import * as yup from 'yup';
import { Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
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
    username: yup.string(),
    email: yup.string().email(),
  })
  .required();

export const UpdateUser = ({ user, isLoading, handleUpdateUser }: Props) => {
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
        isInvalid={!!errors.Username}
      />
      <Input
        name="email"
        label="Email"
        register={register}
        defaultValue={user.email}
        isInvalid={!!errors.email}
      />

      <Button
        type="submit"
        variant="outline"
        colorScheme="green"
        isLoading={isLoading}
      >
        Update
      </Button>
    </form>
  );
};

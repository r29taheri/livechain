import React from 'react';
import * as yup from 'yup';
import { Button } from '@chakra-ui/react';
import { FieldValues, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Uploader } from '..';

interface Props {
  handleUpload: (data: FieldValues) => void;
  isLoading: boolean;
}

const schema = yup
  .object()
  .shape({
    title: yup.string().required(),
    file: yup.mixed().required(),
    description: yup.string(),
  })
  .required();

export const UploadMedia = ({ isLoading, handleUpload }: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(handleUpload)}>
      <Input
        name="title"
        label="Title"
        register={register}
        isInvalid={!!errors.title}
      />
      <Input
        mode="textarea"
        name="description"
        label="Description"
        register={register}
        isInvalid={!!errors.description}
      />
      <Uploader
        name="file"
        label="File"
        register={register}
        handleFile={(file: File) => setValue('file', file)}
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

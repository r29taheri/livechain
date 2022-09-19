import React from 'react';
import * as yup from 'yup';
import { forEach, omit } from 'lodash';
import { Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { mediaApi, assetApi } from '@services/index';
import { User } from '@prisma/client';
import { Input, Uploader } from '..';

interface Props {
  userId: string;
}

const schema = yup
  .object()
  .shape({
    name: yup.string(),
    // username: yup
    //   .string()
    //   .min(4)
    //   .matches(/^[a-zA-Z0-9_]{3,}[a-zA-Z]+[0-9]*$/, 'username is not valid'),
    // email: yup.string().email(),
  })
  .required();

export const UploadMedia = ({ userId }: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleUpload = (data: any) => {
    console.info('data', data);
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('name', 'asdasd');
    assetApi
      .create(formData)
      .then((res) => console.info('res', res))
      .catch((err) => {
        console.info('err', err);
      });
    // forEach(data, (val: string | File, key: string) => {
    //   if (val) {
    //     formData.append(key, val);
    //   }
    // });

    // mediaApi
    //   .create(omit(data, 'file'))
    //   .then((res) => {
    //     console.info('res', res);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

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
      <Button type="submit" variant="outline" colorScheme="green">
        Update
      </Button>
    </form>
  );
};

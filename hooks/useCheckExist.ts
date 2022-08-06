import { useRef, useState } from 'react';
import { userApi } from '@services/index';

export const useCheckExist = (data: { field: string; address: string }) => {
  const currentVal = useRef('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = async (value: string) => {
    if (currentVal.current === value) return;
    currentVal.current = value;
    setIsChecking(true);
    const { field, address } = data;
    userApi
      .check({ field, value, address })
      .then(() => {
        setIsInvalid(false);
      })
      .catch(() => {
        setIsInvalid(true);
      })
      .finally(() => {
        setIsChecking(false);
      });
  };

  return { isChecking, isInvalid, handleCheck };
};

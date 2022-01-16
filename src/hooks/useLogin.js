import {useMutation} from 'react-query';
import axios from 'axios';
import {LOGIN_URL} from '@api';
import {unauthHeader} from '@util/header';

export const useLogin = () => {
  return useMutation(
    async values => {
      const response = await axios.post(LOGIN_URL, values, {
        headers: unauthHeader,
      });
      return response?.data;
    },
    {
      retry: 1,
    },
  );
};

import {useMutation} from 'react-query';
import axios from 'axios';
import {REGISTER_URL} from '@api';
import {unauthHeader} from '@util/header';

export default () => {
  return useMutation(
    async values => {
      const response = await axios.post(REGISTER_URL, values, {
        headers: unauthHeader,
      });
      return response?.data;
    },
    {
      retry: 1,
    },
  );
};

import {useQuery} from 'react-query';
import axios from 'axios';
import {ORDER_URL} from '@api';
import {authHeader, parameterizeObject} from '@util/header';

export default props => {
  const params = parameterizeObject(props);
  return useQuery(
    ['orders', params],
    async () => {
      return await axios.get(ORDER_URL + '?' + params, {
        headers: authHeader,
      });
    },
    {
      keepPreviousData: false,
    },
  );
};

import {useQuery} from 'react-query';
import axios from 'axios';
import {authHeader, parameterizeObject} from '@util/header';
import {ORDER_DETAIL_URL, PRINT_ORDER_URL} from '@api';

export const useOrderDetail = props => {
  const params = parameterizeObject(props);
  return useQuery(
    ['orderDetail', params],
    async () => {
      return await axios.get(`${ORDER_DETAIL_URL}${props.id}?${params}`, {
        headers: authHeader,
      });
    },
    {
      keepPreviousData: false,
    },
  );
};

export const useOrderPrint = props => {
  const params = parameterizeObject(props);
  return useQuery(
    ['orderPrint', params],
    async () => {
      return await axios.get(`${PRINT_ORDER_URL}${props.id}`, {
        headers: authHeader,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    },
  );
};

import {useQuery, QueryClient, useMutation} from 'react-query';
import axios from 'axios';
import {authHeader, parameterizeObject} from '@util/header';
import {ORDER_EDIT_URL, SAVE_EDITTED_ORDER_URL} from '@api';

const queryClient = new QueryClient();

export const useOrderEdit = props => {
  const params = parameterizeObject(props);
  return useQuery(
    ['editOrderById', params],
    async () => {
      return await axios.get(`${ORDER_EDIT_URL}${props.id}?${params}`, {
        headers: authHeader,
      });
    },
    {
      keepPreviousData: false,
    },
  );
};

export const useSaveOrderEdit = () => {
  return useMutation(
    async values => {
      const response = await axios.post(
        `${SAVE_EDITTED_ORDER_URL}${values.id}`,
        values,
        {
          headers: authHeader,
        },
      );
      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
      retry: 3,
    },
  );
};

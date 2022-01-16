import {useQuery, QueryClient, useMutation} from 'react-query';
import axios from 'axios';
import {authHeader} from '@util/header';
import {UPDATE_PROFILE_URL, UPDATE_PASSWORD_URL, PROFILE_URL} from '@api';

const queryClient = new QueryClient();

export const useProfile = props => {
  return useQuery(
    ['profile', props.counter],
    async () => {
      return await axios.get(`${PROFILE_URL}`, {
        headers: authHeader,
      });
    },
    {
      keepPreviousData: false,
    },
  );
};

export const useUpdateProfile = () => {
  return useMutation(
    async values => {
      const response = await axios.post(UPDATE_PROFILE_URL, values, {
        headers: authHeader,
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
      retry: 1,
    },
  );
};

export const useSavePassword = () => {
  return useMutation(
    async values => {
      const response = await axios.post(UPDATE_PASSWORD_URL, values, {
        headers: authHeader,
      });
      return response?.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
      retry: 1,
    },
  );
};

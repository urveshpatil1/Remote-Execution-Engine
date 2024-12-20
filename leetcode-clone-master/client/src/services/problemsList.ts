import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../shared/apiEndPointURL';
import { PageInfoInterface, Problems } from '../interfaces';

export const problemsListService = async (
  params: PageInfoInterface,
): Promise<
  AxiosResponse<{
    message: string;
    data: Problems[];
    totalProblems: number;
  }>
> => {
  const result = await axios
    .get(API_URL.problemsList, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params,
    })
    .then((response) => response)
    .catch((error) => {
      if (error.response.data.message) throw new Error(error.response.data.message);
      else throw new Error('Something went wrong!');
    });

  return result;
};

import { proceedError } from '@/06-shared/catchError';
import { responseArraySchema, responseSchems } from '../types/responseSchema';
import axiosInstance from '@/06-shared/api/axiosInstance';

export const ResponseService = {
  async getComments(goodId: string, signal: AbortSignal) {
    try {
      const response = await axiosInstance.get(`/responses/byGoodId/${goodId}`, { signal });
      console.log(response);

      const validDate = responseArraySchema.parse(response.data);
      return validDate;
    } catch (error) {
      proceedError(error);
    }
  },

  async addComment(comment: string, goodId: string) {
    try {
      const response = await axiosInstance.post(`/responses/${goodId}`, { comment });
      const validDate = responseSchems.parse(response.data);
      return validDate;
    } catch (error) {
      proceedError(error);
    }
  },
};

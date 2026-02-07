import axiosInstance from '@/06-shared/api/axiosInstance';
import { proceedError } from '@/06-shared/catchError';
import { categoryArraySchema } from '../types/categorySchema';

export const CategoryService = {
  async getAllCategories(signal: AbortSignal) {
    try {
      const response = await axiosInstance.get('/categories/', { signal });
      const validDate = categoryArraySchema.parse(response.data);
      return validDate;
    } catch (error) {
      proceedError(error);
    }
  },
};

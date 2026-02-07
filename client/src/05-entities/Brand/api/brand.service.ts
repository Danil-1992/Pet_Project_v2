import axiosInstance from '@/06-shared/api/axiosInstance';
import { proceedError } from '@/06-shared/catchError';
import { brandArraySchema } from '../types/brandTypes';

export const BrandService = {
  async getAllBrands(signal: AbortSignal) {
    try {
      const response = await axiosInstance.get('brands/', { signal });
      const validDate = brandArraySchema.parse(response.data);
      return validDate;
    } catch (error) {
      console.log(error);
      proceedError(error);
    }
  },
};

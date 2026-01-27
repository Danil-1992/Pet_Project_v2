import { proceedError } from '@/06-shared/catchError';
import axiosInstance from '../../../06-shared/api/axiosInstance';
import type { UserLogin, UserResponse } from '../types/userSchema';
import { UserResponseSchema, type UserRegister } from '../types/userSchema';

export const userService = {
  async signUp(formData: UserRegister) {
    try {
      const response = await axiosInstance.post('/auth/signup', formData);
      const validateData = UserResponseSchema.parse(response.data);
      return validateData;
    } catch (error) {
      proceedError(error);
    }
  },

  async signIn(formData: UserLogin) {
    try {
      const response = await axiosInstance.post('/auth/signin', formData);
      const validateData = UserResponseSchema.parse(response.data);
      return validateData;
    } catch (error) {
      proceedError(error);
    }
  },

  async signOut(): Promise<void> {
    try {
      await axiosInstance.delete('/auth/logout');
    } catch (error) {
      proceedError(error);
    }
  },

  async refresh(): Promise<UserResponse | undefined> {
    try {
      const response = await axiosInstance.get('/auth/refresh');
      const validateData = UserResponseSchema.parse(response.data);
      return validateData;
    } catch (error) {
      proceedError(error);
    }
  },
};

export default userService;

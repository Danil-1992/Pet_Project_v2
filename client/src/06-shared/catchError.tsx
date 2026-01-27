import axios from 'axios';
import { z } from 'zod';
export const proceedError = (error: unknown): never => {
  if (error instanceof z.ZodError) {
    throw new Error('Ошибка зод', { cause: error });
  }
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data as { message?: string } | undefined;
    const err = responseData?.message;

    if (err) {
      throw new Error(err, { cause: error });
    }

    throw error;
  } else throw error;
};

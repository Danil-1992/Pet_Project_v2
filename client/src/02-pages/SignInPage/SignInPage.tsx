import { signIn } from '@/05-entities/User/model/userThunks';
import type { UserLogin } from '@/05-entities/User/types/userSchema';
import { UserLoginSchema } from '@/05-entities/User/types/userSchema';
import { useAppDispatch } from '@/06-shared/hooks/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export default function SignInPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({ resolver: zodResolver(UserLoginSchema) });

  const submitHandle = (data: UserLogin): void => {
    void dispatch(signIn(data));
    reset();
    void navigate('/');
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitHandle)}>
        <div>
          <label>Почта: {"  "}
            <input {...register('email')} placeholder="Введите свой пароль" />
            {errors.email && <p>{errors.email.message}</p>}
          </label>
        </div>
        <div>
          <label>Пароль: {"  "}
            <input {...register('password')} placeholder="Введите свой пароль" />
            {errors.password && <p>{errors.password.message}</p>}
          </label>
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

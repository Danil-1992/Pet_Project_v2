import { signUp } from '@/05-entities/User/model/userThunks';
import type { UserRegister } from '@/05-entities/User/types/userSchema';
import { UserRegisterSchema } from '@/05-entities/User/types/userSchema';
import { useAppDispatch } from '@/06-shared/hooks/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export default function SignUpPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>({ resolver: zodResolver(UserRegisterSchema) });

  const submitHandler = (data: UserRegister): void => {
    void dispatch(signUp(data));
    reset();
    void navigate('/');
  };

  return (
    <div
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>
            Имя:{'  '}
            <input {...register('name')} placeholder="Введите свое имя" />
            {errors.name && <p>{errors.name.message}</p>}
          </label>
        </div>
        <div>
          <label>
            Почта:{'  '}
            <input {...register('email')} placeholder="Введите вашу почту" />
            {errors.email && <p>{errors.email.message}</p>}
          </label>
        </div>
        <div>
          <label>
            Пароль:{'  '}
            <input {...register('password')} placeholder="Введите ваш пароль" />
            {errors.password && <p>{errors.password.message}</p>}
          </label>
        </div>
        <div>
          <label>
            Повторите Ваш пароль:{'  '}
            <input {...register('confirmPassword')} placeholder="Повторите ваш пароль" />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </label>
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

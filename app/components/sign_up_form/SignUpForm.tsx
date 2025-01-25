'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<FormData>();
  const [serverError, setServerError] = useState<string | null>(null); // Para errores generales
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      // Limpiar errores previos
      setServerError(null);
      clearErrors();

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (!res.ok) {
        if (response.error === 'Email or username already exists.') {
          // Mostrar errores específicos del servidor
          setError('email', { message: 'Email already exists.' });
          setError('username', { message: 'Username already exists.' });
        } else {
          // Mostrar errores generales
          setServerError(response.error || 'Something went wrong.');
        }
      } else {
        alert('User registered successfully!');
        router.push('/auth/login'); // Redirigir al login tras éxito
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setServerError('Something went wrong. Please try again.');
    }
  };

  // Comparar contraseñas
  const password = watch('password', '');

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-xl font-semibold mb-4 text-center">Sign Up</h1>

        {/* Mostrar error general del servidor */}
        {serverError && <p className="text-red-500 text-sm mb-4">{serverError}</p>}

        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="mt-1 p-2 w-full border rounded"
            placeholder="Your Name"
            {...register('name', {
              required: 'Name is required.',
              minLength: { value: 3, message: 'Name must be at least 3 characters.' },
            })}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-bold text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="mt-1 p-2 w-full border rounded"
            placeholder="Your Username"
            {...register('username', {
              required: 'Username is required.',
              minLength: { value: 3, message: 'Username must be at least 3 characters.' },
            })}
          />
          {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 p-2 w-full border rounded"
            placeholder="you@example.com"
            {...register('email', {
              required: 'Email is required.',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format.' },
            })}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        {/* Contraseña */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-bold text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required.',
              minLength: { value: 8, message: 'Password must be at least 8 characters.' },
            })}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>

        {/* Confirmar contraseña */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="mt-1 p-2 w-full border rounded"
            placeholder="Confirm your password"
            {...register('confirmPassword', {
              required: 'Please confirm your password.',
              validate: (value) => value === password || 'Passwords do not match.',
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

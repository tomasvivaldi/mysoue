"use client"
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { EnvelopeIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import SolidButton from '@/components/buttons/SolidButton';
import SolidButton1 from '@/components/buttons/SolidButton1';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Forgot password request initiated for email:', email);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      console.log('Forgot password response:', data);
      setMessage(data.message || data.error);
    } catch (error) {
      console.error('Forgot password error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className='mb-4 flex flex-col gap-1'>
            <h1 className="text-2xl font-bold ">Forgot Password</h1>
            <p className='text-xs'>Enter your email address and we'll send you a link to reset your password.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center">
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email Address
            </label>
            <div className="flex relative items-center border border-gray-300 rounded">
            <EnvelopeIcon className="top-1/2 h-5 w-5 -translate-y-1/2  text-gray-400 absolute left-3" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="border-0 pl-10 py-2 rounded w-full focus:outline-none focus:ring-[#C6B8A2] focus:ring-2"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>
          </div>
            <SolidButton1 text={'Send Reset Link'} disabled={isLoading} className='w-full' type='submit' />
            <button
                type="button"
                onClick={() => window.history.back()}
                className="text-slate-600 underline hover:text-slate-800 focus:outline-none transition duration-150 ease-in-out"
                >
                Back to login
                </button>
        </form>
        {message && (
          <div className="mt-4 bg-yellow-100 text-yellow-800 p-2 rounded text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
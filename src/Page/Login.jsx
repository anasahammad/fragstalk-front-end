import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaArrowRight } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';
import { userActions } from '../store/reducers/userReducer';


const sendLoginCode = async (email) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email });
  return response.data;
};

const verifyLoginCode = async ({ email, code }) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/verify-otp`, { email, otp: code });
  return response.data;
};

const VerificationCodeInput = ({ onSubmit }) => {
  const [code, setCode] = useState('');

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(code);
    }}>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          required
          maxLength={6}
          pattern="\d{6}"
        />
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all duration-300"
      >
        Verify <FaArrowRight className="ml-2" />
      </button>
    </form>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('email');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendCodeMutation = useMutation({
    mutationFn: sendLoginCode,
    onSuccess: () => {
      toast.success('Verification code sent to your email');
      setStep('verification');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to send verification code');
      setError(true);
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: verifyLoginCode,
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('userAccount', JSON.stringify(data));
      toast.success('Login successful');
      data.role==='admin' ? navigate('/admin') : navigate('/');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Invalid verification code');
      setError(true);
      console.log(error);
    },
  });

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError(false);
    sendCodeMutation.mutate(email);
  };

  const handleVerificationSubmit = (code) => {
    setError(false);
    verifyCodeMutation.mutate({ email, code });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-wide">
            Pramanik Furniture
          </h1>
          <p className="text-gray-700 text-lg font-medium">Log in</p>
          {step === 'email' ? (
            <p className="text-sm text-gray-500 mb-8">
              Enter your email and we'll send you a login code.
            </p>
          ) : (
            <p className="text-sm text-gray-500 mb-8">
              Enter the 6-digit code sent to your email.
            </p>
          )}
        </div>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            An error occurred. Please try again.
          </div>
        )}
        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all duration-300"
              disabled={sendCodeMutation.isLoading}
            >
              {sendCodeMutation.isLoading ? 'Sending...' : 'Continue'} <FaArrowRight className="ml-2" />
            </button>
          </form>
        ) : (
          <VerificationCodeInput onSubmit={handleVerificationSubmit} />
        )}
        <div className="mt-8 text-center">
          <a
            href="#"
            className="text-sm text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fetchAPI } from '../lib/fetch';
import { useUser } from '../context/UserContaxt';

const SignInPage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate()
  const { setUserContext } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetchAPI('/users/register-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type for JSON
        },
        body: JSON.stringify(user),
      });
      console.log(response);
      
      if (response?.error) setErrMsg(response.message);
      else {
        navigate('/user')
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUserContext(response.data.user)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2 sm:p-0">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Regsiter
        </h2>
        <p className="text-center text-sm">
         Tender Managment(assesment)
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {errMsg && <p className="text-center bg-red-200 p-2 rounded-md text-red-500 text-sm ">
            {errMsg}
          </p>}
          <Input
            label="Enter Name"
            id="name"
            type="text"
            value={user.name}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            placeholder="Gazi Wani"
            required
          />
          <Input
            label="Email Address"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            id="password"
            type="text"
            value={user.password}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
            placeholder="......."
            required
          />

          <Button className='w-full' type="submit" text="Regsiter" loading={loading} />
        </form>

        <p className="text-center text-sm text-gray-600">
          Have an account?
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;

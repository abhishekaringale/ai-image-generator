import React, { useContext, useState } from 'react';
import Model from './Modal';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import {toast} from 'react-hot-toast';

function Login() {
  const [state, setState] = useState('Login');
  const { setShowLogin, setUser ,setCredit} = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const url =
      state == 'Login'
        ? `${import.meta.env.VITE_BACKEND_URL}/api/user/login`
        : `${import.meta.env.VITE_BACKEND_URL}/api/user/register`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setShowLogin(false);
        console.log("data",data)
        setUser(data.user);
        setCredit(data.user.credit)
          
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div>
      <Model>
        <form action="" className="text-slate-500 mt-2" onSubmit={onSubmit}>
          <h1 className="text-center text-3xl text-neutral-700 font-medium">
            {state}
          </h1>
          <p className="text-md my-3">
            Welcome back! Please {state} to continue
          </p>

          {state != 'Login' && (
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.user_icon} alt="" width={30} />
              <input
                type="text"
                placeholder="Full Name"
                required
                className="outline-none text-sm"
                onChange={handleChange}
                value={formData.name}
                name="name"
              />
            </div>
          )}
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.email_icon} alt="" width={25} />
            <input
              type="email"
              placeholder="Email"
              id=""
              required
              className="outline-none text-sm"
              onChange={handleChange}
              value={formData.email}
              name="email"
            />
          </div>
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.lock_icon} alt="" className="" width={30} />
            <input
              type="password"
              placeholder="Password"
              id=""
              required
              className="outline-none text-sm"
              onChange={handleChange}
              value={formData.password}
              name="password"
            />
          </div>

          <p className="text-sm text-blue-600 my-4 cursor-pointer">
            Forgot Password?
          </p>

          <button className="bg-blue-600 w-full text-white py-2 rounded-full btn">
            {state == 'Login' ? 'login' : 'Create account'}
          </button>

          {state === 'Login' ? (
            <p className="mt-5 text-center">
              Don't have an account?
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState('Sign Up')}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="mt-5 text-center">
              Already have an account?
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState('Login')}
              >
                Login
              </span>
            </p>
          )}
        </form>
      </Model>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response)
);

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      setError(''); // Clear any previous error
  
      // Make a POST request to the server to perform login
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
  
      const { token, role } = response.data;
  
      // Save the JWT token to localStorage or a secure storage solution
      localStorage.setItem('token', token);
  
      if (role === 'admin') {
        console.log('Admin login successful');
        navigate('/AdminDashboard'); // Redirect to the admin dashboard page
      } else if (role === 'user') {
        console.log('User login successful');
        navigate('/UserTransactionHistory'); // Redirect to the user dashboard page
      } else {
        console.log('Invalid role');
        // Handle the case of an unknown or invalid role
      }
    } catch (error) {
      console.error(error);
      setError('Failed to login. Please check your credentials.'); // Set the error message
    }
  };
  

  const handleForgotPassword = () => {
    // Redirect to the forgot password page
    navigate('/ForgotPassword');
  };

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
            <div className="text-center mx-auto mb-5" >
            <h1 className="display-5"> Login </h1>
            <hr className="w-25 mx-auto text-primary" />
                <div className="row justify-content-center position-relative" >
                            <div className="col-lg-8">
                                  <div className="bg-primary p-5 m-5 mb-0">
                                      {error && <span>{error}</span>}
                                      <form onSubmit={handleSubmit(onSubmit)}>
                                      <div className="row g-3">
                                        <div className="col-12">
                                          <input
                                            type="text"
                                            id="email"
                                            placeholder="Enter Your Email"
                                            {...register('email', { required: true })}
                                            className="form-control bg-light border-0"/>
                                          {errors.email && <span>This field is required</span>}
                                          
                                        </div>
                                        
                                        <div className="col-12">
                                          
                                          <input
                                            type="password"
                                            placeholder="Enter Your Password"
                                            id="password"
                                            {...register('password', { required: true })}
                                          className="form-control bg-light border-0"/>
                                          {errors.password && <span>This field is required</span>}
                                        </div>
                                       

                                        <div className="col-12">
                                <button type="submit" className="btn btn-secondary w-100 py-3">Login</button>

                                </div>

                                        <div className="col-12">
                                <button type="button" className="btn btn-secondary w-100 py-3" onClick={handleForgotPassword}>Forgot Password</button>

                                </div>
                                </div>
                                      </form>
                                    </div>  
                          </div>
                              
                </div>

    </div>
      </div>
            </div>
  );
};

export default Login;

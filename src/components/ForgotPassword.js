import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Perform forgot password logic here
    console.log('Reset password email sent to:', data.email);
    // Perform any other actions, such as displaying a success message
  };

  const handleGoBack = () => {
    navigate('/login');
  };

  return (
    <div className="container-fluid py-5">
    <div className="container py-5">
          <div className="text-center mx-auto mb-5" >
          <h1 className="display-5"> Forgot Password </h1>
          <hr className="w-25 mx-auto text-primary" />
              <div className="row justify-content-center position-relative" >
                          <div className="col-lg-8">
                                <div className="bg-primary p-5 m-5 mb-0">
                                  <form onSubmit={handleSubmit(onSubmit)}>
                                  <div className="row g-3">
                                        <div className="col-12">
                                      <input
                                      placeholder="Enter Your Email"
                                        type="email"
                                        id="email"
                                        {...register('email', { required: true })}
                                        className="form-control bg-light border-0"/>
                                      {errors.email && <span>This field is required</span>}
                                    </div>

                                    <div className="col-12">
                                <button type="submit" className="btn btn-secondary w-100 py-3">Reset Password</button>

                                </div>

                                        <div className="col-12">
                                <button type="button" className="btn btn-secondary w-100 py-3" onClick={handleGoBack}>Go Back</button>

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

export default ForgotPassword;

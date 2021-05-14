//jshint esversion: 8
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { changePasswordHandler } from "../auth/helper";
import  "./css/signup.css"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const ChangePassword = () => {
  const [values, setValues] = useState({
    oldPassword:"",
    plainPassword: "",
    error: "",
    success: false,
  });

  const { oldPassword, plainPassword, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    changePasswordHandler({ oldPassword,plainPassword })
    .then((data) => {
        if (data.error) {
        errorMessage()
        setValues({ ...values, error: data.error, success: false });
        } else {
        successMessage()
        setValues({
            ...values,
            oldPassword: "",
            plainPassword: "",
            error: "",
            success: true,
        });
        }
    })
    .catch( () =>{
        errorMessage()
        console.log("Error in changePasscord")
    }
        );

};

const changePasswordForm = () => {
    return (
    <div className="row">
        <div className="col-md-4 col-sm-10 offset-md-4 offset-sm-1 text-left">
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
        <form action="">
            <div className="form-group py-2">
            <label className="fs-6 ls-1">Old Password</label>
            <input
                className="form-control"
                onChange={handleChange("oldPassword")}
                type="tel"
                value={oldPassword}
            />
            </div>
            <div className="form-group py-2">
            <label className="fs-6 ls-1">New Password</label>
            <input
                className="form-control"
                onChange={handleChange("plainPassword")}
                type="password"
                value={plainPassword}
            />
            </div>
            <button onClick={onSubmit} className="btn btn-success py-3 my-5 fs-7 ls-1 fw-bold border-0 bg-secondary btn-block">
            Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    
            toast.success('Password Change Successfully', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
  };

  const errorMessage = () => {
    if(error){
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  };

  return (
      <div>
    {/* <Base title="Sign up page" description="A page for user to sign up!"> */}
        <div class="signup py-5">
            <div className="container pt-5">
                <div className="bg-transparent text-white text-center p-5">
                  <div class="heading-font text-center pb-4 fw-bold color-white ls-2">Change Password</div>
                    {changePasswordForm()}
                    <p className="text-white text-center">{JSON.stringify(values)}</p>
                </div>
            </div>
        </div>
      
      
   
    </div>
  );
};

export default ChangePassword;

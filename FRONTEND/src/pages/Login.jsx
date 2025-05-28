import Form from '@/components/common-view/Form'
import { loginFormControl } from '@/config'
import { checkAUth, loginUser } from '@/redux/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { data, Link, } from 'react-router-dom'
import { toast } from "sonner";

const Login = () => {
  const initialState={
    password:'',
    email:''
  }
  const dispatch=useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
       toast.success(`${data?.payload?.message}`)
      } else {
        toast.error(`${data?.payload?.message}`);
      }
    });
  };
  const [formData,setFormData] = useState(initialState)
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
         Sign in to your Account
        </h1>
        <p className='mt-2'>
          Don't have an Account?
          <Link className="hover:underline text-primary font-medium ml-2" to='/auth/register'>
            Register
          </Link>
        </p>
      </div>
      <Form
      FormControls={loginFormControl}
      FormData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      buttonText={'Sign In'}
      />
    </div>
  )
}

export default Login

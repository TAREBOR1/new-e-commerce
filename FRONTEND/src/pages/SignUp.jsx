import Form from "@/components/common-view/Form";
import { registerFormControl } from "@/config";
import { registerUser } from "@/redux/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
  const initialState = {
    username: "",
    password: "",
    Email: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(`${data?.payload?.message}`);
        navigate("/auth/login");
        console.log(data);
      } else {
        toast.error(`${data?.payload?.message}`);
      }
    });
  };
  console.log(formData);
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create New Account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="hover:underline text-primary font-medium ml-2"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <Form
        FormControls={registerFormControl}
        FormData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign Up"}
      />
    </div>
  );
};

export default SignUp;

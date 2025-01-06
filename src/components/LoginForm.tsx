"use client"

import Link from "next/link";
import { LoginFormConfig } from "@/config/LoginFormConfig";
import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import { Toast } from "./toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { usePublic } from "@/hooks/usePublic";
import { ILogin } from "@/interfaces/ILogin";

const initialValues: ILogin = {
  email: "",
  password: "",
};

interface ILoginExtended extends ILogin{
  [key: string]: string;
}

export default function LoginForm() {
  usePublic();
  const { login } = useAuth();

  const [form, setForm] = useState<ILogin>(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const router = useRouter();

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...initialValues };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email, format: example@mail.com";
      valid = false;
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    setIsFormValid(valid);
    return valid;
  };

  useEffect(() => {
    validateForm();
  }, [form]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await login(form);
        Toast.fire("User Logged!", "", "success");
      } catch (error: any) {
        const errorMessage = error.response.data.message;
        const messageToShow =
          ["Invalid password", "User does not exist"].includes(errorMessage)
            ? "Invalid credentials"
            : errorMessage;
        Toast.fire(messageToShow, "Try Again", "error");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <h3 className="text-white text-lg sm:text-xl font-semibold text-center mb-4">
          Do not have an account?{" "}
          <br />
          <Link href={`/auth/signUp`} className="text-blue-400 hover:underline">
            Register Here!
          </Link>
        </h3>

        {LoginFormConfig.map(({ name, label, type, placeholder }, index) => (
          <div key={index} className="flex flex-col mb-4">
            <FormInput
              name={name}
              label={label}
              placeholder={placeholder}
              type={type}
              value={form[name as keyof ILogin]}
              onChange={onChange}
            />
            {errors[name] && (
              <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className={`bg-blue-600 w-full text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300
            ${!isFormValid ? "bg-blue-300 cursor-not-allowed opacity-50" : ""}`}
          disabled={!isFormValid}
        >
          Login
        </button>
      </form>
    </div>
  );
}

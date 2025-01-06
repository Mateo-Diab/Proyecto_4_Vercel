"use client"

import { usePublic } from "@/hooks/usePublic";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SignUpFormConfig } from "@/config/SignUpFormConfig";
import singup from "@/helpers/singup";
import { Toast } from "./toast";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import { IRegister } from "@/interfaces/IRegister";

const initialValues: IRegister = {
  name: "",
  email: "",
  address: "",
  phone: "",
  password: "",
  repeatPassword: "",
};

interface IRegisterExtended extends IRegister{
  [key: string]: string
}

export default function SignUpForm() {
  usePublic();
  const router = useRouter();

  const [form, setForm] = useState<IRegister>(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...initialValues };

    const nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
    if (!nameRegex.test(form.name)) {
      newErrors.name = "Name must start with a capital and be 3+ characters";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email, format: example@mail.com";
      valid = false;
    }

    const addressRegex = /[A-Za-z0-9\s]+/;
    if (!addressRegex.test(form.address)) {
      newErrors.address = "Invalid address. Example: 123 Main St.";
      valid = false;
    }

    const phoneRegex = /^[0-9]{7,10}$/;
    if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Phone number must be between 7 and 10 digits";
      valid = false;
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    if (form.password !== form.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
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
        await singup(form);
        Toast.fire("User Created!", "", "success");
        router.push("/auth/login");
      } catch (error: any) {
        const errorMessage =
          error.response.data.message || "An error occurred. Please try again.";
        Toast.fire(errorMessage, "Try Again", "error");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <h3 className="text-white text-lg sm:text-xl font-semibold text-center mb-4">
          Already have an account?{" "}
          <br />
          <Link href={`/auth/login`} className="text-blue-400 hover:underline">
            Login Here!
          </Link>
        </h3>

        {SignUpFormConfig.map(({ name, label, type, placeholder }, index) => (
          <div key={index} className="flex flex-col mb-4">
            <FormInput
              name={name}
              label={label}
              placeholder={placeholder}
              type={type}
              value={form[name as keyof IRegister] }
              onChange={onChange}
            />
            {errors[name] && (
              <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className={`bg-blue-600 w-[17em] text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 
            ${!isFormValid ? "bg-blue-300 cursor-not-allowed opacity-50" : ""}`}
          disabled={!isFormValid}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

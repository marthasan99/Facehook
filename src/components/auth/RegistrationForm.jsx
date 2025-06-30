import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Field from "../Field";
const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    console.log(formData);
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData
      );
      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("root.random", {
        type: "random",
        message: `Registration Failed: ${error.message}`,
      });
    }
  };

  return (
    <>
      <form
        className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
        onSubmit={handleSubmit(submitForm)}
      >
        <Field label="First Name" error={errors.firstName}>
          <input
            type="text"
            name="firstName"
            id="firstName"
            {...register("firstName", { required: "First Name is required" })}
            className={`auth-input ${
              errors.firstName ? " border-red-500" : "border-gray-200"
            }`}
          />
        </Field>
        <Field label="Last Name" error={errors.lastName}>
          <input
            type="text"
            name="lastName"
            id="lastName"
            {...register("lastName")}
            className={`auth-input ${
              errors.lastName ? " border-red-500" : "border-gray-200"
            }`}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            name="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className={`auth-input ${
              errors.email ? " border-red-500" : "border-gray-200"
            }`}
          />
        </Field>
        <Field label="Password" error={errors.password}>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className={`auth-input ${
              errors.password ? " border-red-500" : "border-gray-200"
            }`}
          />
        </Field>
        <p className="mt-2 text-red-500">{errors.root?.random?.message}</p>
        <button
          className="auth-input bg-lws-green font-bold text-deep-dark transition-all hover:opacity-90"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegistrationForm;

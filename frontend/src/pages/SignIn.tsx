import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({
        message: "Signed In Successfully",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },

    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = (values: SignInFormData) => {
    mutation.mutate(values);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action=""
      className=" flex flex-col gap-5"
    >
      <h2 className=" font-bold text-3xl">Sign In</h2>

      <label htmlFor="" className=" text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          className=" border rounded w-full py-1 px-2 font-normal"
          type="email"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className=" text-red-500">{errors.email.message}</span>
        )}
      </label>

      <label htmlFor="" className=" text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          className=" border rounded w-full py-1 px-2 font-normal"
          type="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className=" text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className=" flex items-center justify-between">
        <span className=" text-sm">
          Not Registered?{" "}
          <Link className=" underline" to="/register">
            Create An Account
          </Link>
        </span>
      </span>
      <span>
        <button
          type="submit"
          className=" rounded bg-blue-600 text-white px-6 py-2 font-bold hover:bg-blue-500 text-xl"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;

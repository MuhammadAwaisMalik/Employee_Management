import Button from "../../components/button";
import InputField from "../../components/inputField";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @import dependencies
import * as yup from "yup";
import { toast } from "react-toastify";
import { PostData } from "../../data/apiService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const baseSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required."),
  password: yup.string().required("Password is required."),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(baseSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await PostData("/auth/login", data);
      if (res?.success) {
        dispatch(
          loginSuccess({
            token: res?.data?.token,
            authData: res?.data,
          })
        );
        toast.success(res?.message);
        if (res?.data?.user?.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-teal-600 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-teal-600 from-50% to-gray-100 to -50% space-y-6" />
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="font-sevillana text-4xl font-normal text-white mb-8">
          Employee Management System
        </h1>

        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  placeholder="Enter your email"
                  error={errors?.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  placeholder="******"
                  error={errors.password?.message}
                />
              )}
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-teal-600  hover:text-teal-500"
              >
                Forgot password?
              </a>
            </div>
            <Button type="submit" variant="primary">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

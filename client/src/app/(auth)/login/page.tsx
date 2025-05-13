"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/authschema/loginSchema";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { loginUser } from "@/actions/auth/login";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { store } from "@/redux/store";
import { verifyLogin } from "@/redux/features/auth/authSlice";

type FormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await loginUser(data);

      if (!res?.token) {
        throw new Error(res?.message || "Invalid login response");
      }

      localStorage.setItem("token", res.token);
      toast.success(res.message || "Login Successful");

      const result = await store.dispatch(verifyLogin());
      const user = result?.payload?.user;

      if (!user) {
        throw new Error("User verification failed");
      }

      if (user.role === "recruiter") {
        router.push("/dashboardForRecruiter");
      } else {
        router.push("/dashboard");
      }

    } catch (error: any) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-blue-600">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                placeholder="Enter Email"
                disabled={loading}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  disabled={loading}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => router.push("/forgotPassword")}
                className="text-blue-600 hover:underline text-sm cursor-pointer"
                disabled={loading}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white font-semibold rounded-md py-2 hover:bg-blue-600 transition-all duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Register Link */}
          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/register")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Register
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;

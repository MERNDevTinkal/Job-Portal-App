"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/schema/authschema/forgotPasswordSchema"; 
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { forgotpassword } from "@/actions/auth/forgot-password";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {

  const router= useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    try {
      const res = await forgotpassword(data); 
      toast.success(res.message || "Password reset email sent");
      router.push("/login")
      
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md shadow-lg rounded-xl bg-white p-6">
        <h1 className="text-center text-2xl font-semibold text-blue-600 mb-6">Forgot Password</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              {...register("email")}
              placeholder="Enter your registered email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold rounded-md py-2 hover:bg-blue-600 transition-all duration-300"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

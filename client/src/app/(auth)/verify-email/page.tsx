"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyEmailSchema } from "@/schema/authschema/verifyEmailSchema";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { verifyEmailForRegister } from "@/actions/auth/verify-email";
import { toast } from "sonner";
import { z } from "zod";

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmailPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedEmail) {
      router.push("/register");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const onSubmit = async (data: VerifyEmailFormData) => {
    setLoading(true);
    try {
      if (!email) throw new Error("No email found in localStorage");

      const res = await verifyEmailForRegister({ ...data, email });


      if (res.success) {
        toast.success(res.message || "Email verified successfully");
        console.log({ ...data, email });

        localStorage.removeItem("userEmail");
        router.push("/login");
      } else {
        toast.error(res.message || "Verification failed");

      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-2">Verify Your Email</h1>
        {email && (
          <p className="text-center text-gray-600 mb-6">
            We’ve sent a verification code to <span className="font-medium text-black">{email}</span>
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
              Enter 6-digit OTP
            </label>
            <input
              {...register("verificationCode")}
              id="verificationCode"
              type="text"
              maxLength={6}
              placeholder="verificationCode"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-center tracking-widest"
            />
            {errors.verificationCode && (
              <p className="text-sm text-red-500 mt-1">{errors.verificationCode.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </Button>
        </form>
      </div>
    </div>
  );
}

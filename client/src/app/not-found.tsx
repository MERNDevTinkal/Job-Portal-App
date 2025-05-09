"use client"

import { FC } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; 

const NotFoundPage: FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-semibold text-red-600">404 - Page Not Found</h1>
      <p className="text-lg mt-4">Oops! The page you're looking for doesn't exist.</p>
      <Button
        onClick={() => router.push("/")}
        className="mt-6 text-white bg-blue-600 hover:bg-blue-700"
      >
        Go to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;

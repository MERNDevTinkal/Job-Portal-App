"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { logOutUser } from "@/actions/auth/logout";
import { useRouter } from "next/navigation";

const Navbar = () => {

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOutUser();
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Recruiter Dashboard</h1>
      <div>
        <Button onClick={handleLogout} className="bg-red-600 text-white hover:bg-red-700">
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

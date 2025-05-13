"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { logOutUser } from "@/actions/auth/logout";
import { toast } from "sonner";

const Navbar = () => {

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOutUser();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <nav className="w-full p-4 bg-blue-700 text-white flex justify-between items-center">
      <h1 className="text-xl font-semibold">Recruiter Panel</h1>
      <div className="flex gap-4">
        <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

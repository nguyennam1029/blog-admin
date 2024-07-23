/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import authApiRequest from "@/apiRequests/auth";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const result = await authApiRequest.logout();
      toast({
        variant: "default",
        description: result?.payload?.message,
      });
      router.push("/login");
    } catch (error) {
      handleErrorApi({
        error,
      });
    }
  };
  return (
    <Button size={"sm"} onClick={handleLogout}>
      Logout
    </Button>
  );
}

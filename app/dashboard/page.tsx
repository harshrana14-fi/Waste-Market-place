"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/auth/login");
      return;
    }

    const role = (session as any)?.role || "producer";
    
    switch (role) {
      case "producer":
        router.push("/dashboard/producer");
        break;
      case "recycler":
        router.push("/dashboard/recycler");
        break;
      case "corporate":
        router.push("/dashboard/corporate");
        break;
      default:
        router.push("/dashboard/producer");
    }
  }, [session, status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Dashboard</h2>
        <p className="text-gray-600">Redirecting you to your personalized dashboard...</p>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth/auth.service";

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const logout = useCallback(() => {
    authService.removeToken();
    setIsAuthenticated(false);
    router.replace("/login");
  }, [router]);

  return {
    isAuthenticated,
    loading,
    logout,
  };
}

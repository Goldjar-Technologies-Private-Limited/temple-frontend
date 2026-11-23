import { authService } from "@/services/auth/auth.service";

/**
 * Resolves API Base URL for Temple Customer Frontend based on NEXT_PUBLIC_ENV
 */
export const getApiBaseUrl = (): string => {
  const env = process.env.NEXT_PUBLIC_ENV || "production";
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (env === "development" || env === "staging") {
    return "https://api-staging.goldjar.in";
  }
  return "https://api.goldjar.in";
};

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;

  const token = authService.getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMsg = `Request failed with status ${res.status}`;
    try {
      const errorJson = await res.json();
      if (errorJson?.message) {
        errorMsg = errorJson.message;
      }
    } catch (_) {}

    if (res.status === 401 || res.status === 403) {
      authService.removeToken();
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.replace("/login");
      }
    }

    throw new Error(errorMsg);
  }

  return res.json();
}

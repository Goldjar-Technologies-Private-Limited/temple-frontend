import { apiClient } from "@/lib/api";
import type {
  LoginInitiateRequest,
  LoginInitiateResponse,
  LoginVerifyRequest,
  LoginVerifyResponse,
  SignupRequest,
  SignupResponse,
} from "@/models/auth/auth.model";

const TOKEN_KEY = "c_token";
const COOKIE_DAYS = 7;

/**
 * Helper to get a cookie value by name
 */
function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Helper to set a cookie value
 */
function setCookie(name: string, value: string, days: number = COOKIE_DAYS) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

/**
 * Helper to remove a cookie
 */
function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

export const authService = {
  loginInitiate: async (
    request: LoginInitiateRequest,
  ): Promise<LoginInitiateResponse> => {
    return apiClient<LoginInitiateResponse>("/api/auth/customer/login/initiate", {
      method: "POST",
      body: JSON.stringify(request),
    });
  },

  loginVerify: async (
    request: LoginVerifyRequest,
  ): Promise<LoginVerifyResponse> => {
    return apiClient<LoginVerifyResponse>("/api/auth/customer/login/verify", {
      method: "POST",
      body: JSON.stringify(request),
    });
  },

  signup: async (request: SignupRequest): Promise<SignupResponse> => {
    return apiClient<SignupResponse>("/api/auth/customer/signup", {
      method: "POST",
      body: JSON.stringify(request),
    });
  },

  setToken: (token: string) => {
    if (!token) return;
    setCookie(TOKEN_KEY, token);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("auth-token", token);
      localStorage.setItem("c_token", token);
    }
  },

  getToken: (): string | undefined => {
    const cookieToken = getCookie(TOKEN_KEY);
    if (cookieToken) return cookieToken;
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("c_token") || localStorage.getItem("auth-token") || undefined;
    }
    return undefined;
  },

  removeToken: () => {
    deleteCookie(TOKEN_KEY);
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("c_token");
    }
  },

  isAuthenticated: (): boolean => {
    return !!authService.getToken();
  },
};

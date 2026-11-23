export interface LoginInitiateRequest {
  mobileNumber: string;
}

export interface LoginInitiateResponse {
  success: boolean;
  message: string;
  sessionId: string | null;
}

export interface LoginVerifyRequest {
  mobileNumber: string;
  otp: string;
}

export interface JwtResponse {
  token: string;
  email: string;
  role: string;
  fullName: string;
}

export interface LoginVerifyResponse {
  success: boolean;
  message: string;
  jwtResponse: JwtResponse | null;
}

export interface SignupRequest {
  name: string;
  contactNo: string;
  firmName?: string;
}

export interface SignupResponse {
  id: number;
  loginId: number | null;
  name: string;
  contactNo: string;
  email: string | null;
  city: string | null;
  firmName?: string;
}

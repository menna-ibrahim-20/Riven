export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  hospitalName: string;
  address: string;
  cityStateZip: string;
  email: string;
  password: string;
}

export interface OtpRequest {
  phone?: string;
  email?: string;
}

export interface VerifyOtpRequest {
  contact: string;
  otp: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    hospitalName: string;
  };
}
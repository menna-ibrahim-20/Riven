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
  success: boolean;
  data: {
    token: string;
    user: {
      userId: number;
      firstName: string;
      lastName: string;
      email: string;
      hospitalId: number;
      hospitalName: string;
      roleId: number;
      roleName: string;
    };
  };

}
export interface OtpResponse {
  otpId: string;
  otp: string;
}

export interface VerifyOtpRequest {
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
}
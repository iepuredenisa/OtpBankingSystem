import axios from "axios";
import { API_BASE_URL } from "../Library/Utils/constants";
import {
    OtpResponse,
    VerifyOtpRequest,
    VerifyOtpResponse,
} from "./otpService.types";

class OtpService {
  async generateOtp(): Promise<OtpResponse> {
    const response = await axios.post<OtpResponse>(
      `${API_BASE_URL}/generate-otp`
    );
    return response.data;
  }

  async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    const response = await axios.post<VerifyOtpResponse>(
      `${API_BASE_URL}/verify-otp`,
      data
    );
    return response.data;
  }
}

export const otpServiceInstance = new OtpService();
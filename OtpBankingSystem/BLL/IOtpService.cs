namespace OtpBankingSystem.BLL
{
    public interface IOtpService
    {
        #region Methods
        Task<(string otp, string otpId)> GenerateOtpAsync();
        Task<bool> VerifyOtpAsync(string userOtp);
        #endregion Methods
    }
}

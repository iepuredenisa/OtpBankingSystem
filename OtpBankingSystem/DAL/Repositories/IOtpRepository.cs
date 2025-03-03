using OtpBankingSystem.Library.Models;

namespace OtpBankingSystem.DAL.Repositories
{
    public interface IOtpRepository
    {
        #region Methods
        Task SaveOtpAsync(OtpDTO otp);
        Task<OtpDTO?> GetOtpAsync(string otpId);
        Task<bool> DeleteOtpAsync(string otpId);
        Task<List<OtpDTO>> GetAllOtpsAsync(); 
        #endregion Methods
    }
}

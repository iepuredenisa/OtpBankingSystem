using System;
using System.Security.Cryptography;
using System.Threading.Tasks;
using OtpBankingSystem.DAL.Repositories;
using OtpBankingSystem.Library.Models;
using BCrypt.Net;
using Microsoft.Extensions.Logging;

namespace OtpBankingSystem.BLL
{
    public class OtpService : IOtpService
    {
        #region Members
        private readonly IOtpRepository _otpRepository;
        private readonly ILogger<OtpService> _logger;
        private const int OtpExpirationMinutes = 2;
        #endregion Members

        #region Constructor
        public OtpService(IOtpRepository otpRepository, ILogger<OtpService> logger)
        {
            _otpRepository = otpRepository;
            _logger = logger;
        }
        #endregion Constructor

        #region Methods
        public async Task<(string otp, string otpId)> GenerateOtpAsync()
        {
            int otpCode = RandomNumberGenerator.GetInt32(100000, 999999);
            string otpString = otpCode.ToString("D6");

            string hashedOtp = BCrypt.Net.BCrypt.HashPassword(otpString);
            string otpId = Guid.NewGuid().ToString();

            var otp = new OtpDTO
            {
                OtpId = otpId,
                HashedOtp = hashedOtp,
                ExpireTime = DateTime.UtcNow.AddMinutes(OtpExpirationMinutes)
            };

            await _otpRepository.SaveOtpAsync(otp);
            _logger.LogInformation($"OTP Generated: {otp.OtpId}, Expires at: {otp.ExpireTime}");

            return (otpString, otp.OtpId);
        }

        public async Task<bool> VerifyOtpAsync(string userOtp)
        {
            var otpList = await _otpRepository.GetAllOtpsAsync();
            foreach (var otp in otpList)
            {
                if (BCrypt.Net.BCrypt.Verify(userOtp, otp.HashedOtp) && otp.ExpireTime > DateTime.UtcNow)
                {
                    await _otpRepository.DeleteOtpAsync(otp.OtpId);
                    _logger.LogInformation($"OTP {otp.OtpId} successfully verified.");
                    return true;
                }
            }
            _logger.LogWarning($"OTP verification failed or expired.");
            return false;
        }
        #endregion Methods
    }
}

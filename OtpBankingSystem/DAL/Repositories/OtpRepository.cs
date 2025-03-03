using OtpBankingSystem.DAL.Context;
using OtpBankingSystem.Library.Models;
using System.Text.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OtpBankingSystem.DAL.Repositories
{
    public class OtpRepository : IOtpRepository
    {
        #region Members
        private readonly RedisContext _redisContext;
        #endregion Members

        #region Constructor
        public OtpRepository(RedisContext redisContext)
        {
            _redisContext = redisContext;
        }
        #endregion Constructor

        #region Methods
        public async Task SaveOtpAsync(OtpDTO otp)
        {
            if (string.IsNullOrEmpty(otp.OtpId)) 
            {
                throw new ArgumentException("OTP ID cannot be null or empty.");
            }

            string otpJson = JsonSerializer.Serialize(otp);
            await _redisContext.SetValueAsync(otp.OtpId, otpJson, TimeSpan.FromMinutes(2));
        }

        public async Task<OtpDTO?> GetOtpAsync(string otp)
        {
            string? otpJson = await _redisContext.GetValueAsync(otp);
            return otpJson != null ? JsonSerializer.Deserialize<OtpDTO>(otpJson) : null;
        }

        public async Task<bool> DeleteOtpAsync(string otp)
        {
            bool exists = await _redisContext.KeyExistsAsync(otp);
            if (!exists)
            {
                return false;
            }

            return await _redisContext.DeleteKeyAsync(otp);
        }


        public async Task<List<OtpDTO>> GetAllOtpsAsync() 
        {
            var keys = await _redisContext.GetAllKeysAsync();
            var otps = new List<OtpDTO>();

            foreach (var key in keys)
            {
                string? otpJson = await _redisContext.GetValueAsync(key);
                if (otpJson != null)
                {
                    var otp = JsonSerializer.Deserialize<OtpDTO>(otpJson);
                    if (otp != null)
                    {
                        otps.Add(otp);
                    }
                }
            }

            return otps;
        }
        #endregion Methods
    }
}

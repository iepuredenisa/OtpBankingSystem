namespace OtpBankingSystem.Library.Models
{
    public class OtpDTO
    {
        #region Properties
        public string OtpId { get; set; }
        public string Otp { get; set; }
        public string HashedOtp { get; set; }
        public DateTime ExpireTime { get; set; } = DateTime.UtcNow.AddMinutes(1);
        #endregion Properties
    }
}

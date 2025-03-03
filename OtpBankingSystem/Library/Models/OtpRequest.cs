namespace OtpBankingSystem.Library.Models
{
    public class OtpRequest
    {
        #region Properties
        public string OtpId { get; set; }
        public string Otp { get; set; }
        #endregion Properties
    }

    public class OtpOnlyRequest
    {
        #region Properties
        public string Otp { get; set; }
        #endregion Properties
    }
}

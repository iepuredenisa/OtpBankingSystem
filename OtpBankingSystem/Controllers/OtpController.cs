using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using OtpBankingSystem.BLL;
using Microsoft.Extensions.Logging;
using OtpBankingSystem.Library.Models;

[ApiController]
[Route("api/otp")]
public class OtpController : ControllerBase
{
    #region Members
    private readonly IOtpService _otpService;
    private readonly ILogger<OtpController> _logger;
    #endregion Members

    #region Constructor
    public OtpController(IOtpService otpService, ILogger<OtpController> logger)
    {
        _otpService = otpService;
        _logger = logger;
    }
    #endregion Constructor

    #region Methods
    [HttpPost("generate-otp")]
    public async Task<IActionResult> GenerateOtp()
    {
        var (otp, otpId) = await _otpService.GenerateOtpAsync();

        _logger.LogInformation($"Generated OTP {otpId} for API request.");

        return Ok(new { otpId, otp });
    }

    [HttpPost("verify-otp")]
    public async Task<IActionResult> VerifyOtp([FromBody] OtpOnlyRequest request)
    {
        bool isValid = await _otpService.VerifyOtpAsync(request.Otp);

        if (isValid)
        {
            _logger.LogInformation($"OTP {request.Otp} successfully verified via API.");
            return Ok(new { message = "OTP valid! Access granted." });
        }

        _logger.LogWarning($"OTP {request.Otp} verification failed.");
        return BadRequest(new { message = "OTP invalid or expired." });
    }

    #endregion Methods
}

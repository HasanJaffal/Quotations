using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using server.Models.DTO;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuotationsController : ControllerBase
    {
        private readonly IQuotationService _quotationService;
        private readonly ILogger<QuotationsController> _logger;

        public QuotationsController(
            IQuotationService quotationService,
            ILogger<QuotationsController> logger)
        {
            _quotationService = quotationService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetQuotations(
            [FromQuery] string? searchQuery,
            [FromQuery] bool sortByCreationDate = false,
            [FromQuery] bool isAscending = true,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            try
            {
                QuotationsResponseDto quotationsResponse = await _quotationService.GetQuotationsAsync(
                    searchQuery,
                    sortByCreationDate,
                    isAscending,
                    pageNumber,
                    pageSize);

                // If no quotations are found, return a 404 status
                if (quotationsResponse.Quotations.IsNullOrEmpty())
                {
                    return NotFound(new { message = "No quotations found." });
                }

                return Ok(quotationsResponse);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting quotations.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}

using server.Models.DTO;

namespace server.Services
{
    public interface IQuotationService
    {
        Task<QuotationsResponseDto> GetQuotationsAsync(
            string? searchQuery,
            bool sortByCreationDate,
            bool isAscending,
            int pageNumber,
            int pageSize);
    }
}

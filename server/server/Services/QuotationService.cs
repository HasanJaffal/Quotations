using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models.DTO;
using AutoMapper;
using server.Models.Domain;

namespace server.Services
{
    public class QuotationService : IQuotationService
    {
        private readonly MotorQuotationsDbContext _context;
        private readonly IMapper _mapper;

        public QuotationService(MotorQuotationsDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<QuotationsResponseDto> GetQuotationsAsync(
            string? searchQuery,
            bool sortByCreationDate,
            bool isAscending,
            int pageNumber,
            int pageSize)
        {
            // Ensure pageSize is always <= 10
            pageSize = pageSize > 10 ? 10 : pageSize;

            // Ensure pageNumber is always >= 1
            pageNumber = pageNumber < 1 ? 1 : pageNumber;

            IQueryable<Quotation> query = _context.Quotations;

            // Search by Car Make or Policy Owner
            if (!string.IsNullOrEmpty(searchQuery))
            {
                query = query.Where(q => q.CarMake.Contains(searchQuery) || q.PolicyOwner.Contains(searchQuery));
            }

            // Sort by Creation Date
            if (sortByCreationDate)
            {
                query = isAscending ? query.OrderBy(q => q.CreationDate) : query.OrderByDescending(q => q.CreationDate);
            }

            int totalQuotations = await query.CountAsync();

            // Calculate the total number of pages
            int totalPages = (int)Math.Ceiling((decimal)totalQuotations / pageSize);

            // Ensure the page number does not exceed the total number of pages
            if (pageNumber > totalPages) pageNumber = totalPages;

            // Paging
            query = query.Skip((pageNumber - 1) * pageSize).Take(pageSize);

            var quotations = await query.ToListAsync();

            // Check if any quotations were found after filtering
            if (!quotations.Any())
            {
                // Handle the case of no data found after filtering
                return new QuotationsResponseDto
                {
                    Quotations = new List<QuotationDto>(),
                    TotalQuotations = 0,
                    PageNumber = pageNumber,
                    PerPage = pageSize,
                    TotalPages = 0
                };
            }

            // Map domain models to DTOs
            List<QuotationDto> quotationsList = _mapper.Map<List<QuotationDto>>(quotations);

            // Create the response DTO
            QuotationsResponseDto responseDto = new()
            {
                Quotations = quotationsList,
                TotalQuotations = totalQuotations,
                PageNumber = pageNumber,
                PerPage = pageSize,
                TotalPages = totalPages
            };

            return responseDto;
        }
    }
}
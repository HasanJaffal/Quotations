using System.Collections.Generic;

namespace server.Models.DTO
{
    public class QuotationsResponseDto
    {
        public List<QuotationDto>? Quotations { get; set; }
        public int TotalQuotations { get; set; }
        public int PageNumber { get; set; }
        public int PerPage { get; set; }
        public int TotalPages { get; set; }
    }
}

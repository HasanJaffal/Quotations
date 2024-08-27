using AutoMapper;
using server.Models.Domain;
using server.Models.DTO;

namespace server.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        { 
            CreateMap<Quotation, QuotationDto>().ReverseMap();
        }
    }
}

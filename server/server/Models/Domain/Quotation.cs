using System.ComponentModel.DataAnnotations;

namespace server.Models.Domain
{
    public class Quotation
    {
        [Key]
        public int QuotationNumber { get; set; }
        [Required]
        [MaxLength(64)]
        public string PolicyOwner { get; set; }
        [Required]
        [MaxLength(64)]
        public string CarMake { get; set; }
        [Required]
        [Range(1886, 2100)]
        public int CarYearOfMake { get; set; }
        [Required]
        [RegularExpression("Draft|Purchased", ErrorMessage = "QuotationStatus must be `Draft` or `Purchased`.")]
        public string QuotationStatus { get; set; }
        public DateTime CreationDate { get; set; }
    }
}

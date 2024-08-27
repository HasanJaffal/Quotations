using Microsoft.EntityFrameworkCore;
using server.Models.Domain;

namespace server.Data
{
    public class MotorQuotationsDbContext : DbContext
    {
        public MotorQuotationsDbContext(DbContextOptions<MotorQuotationsDbContext> dbContextOptions)
            : base(dbContextOptions)
        {
        }

        public DbSet<Quotation> Quotations { get; set; }
    }
}
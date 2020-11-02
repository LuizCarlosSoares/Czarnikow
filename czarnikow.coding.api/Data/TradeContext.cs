using System;
using czarnikow.coding.domain.entities;
using Microsoft.EntityFrameworkCore; 
using  System.Linq;

namespace czarnikow.coding.api.data
{
    public class TradeContext : DbContext  
    {  
        public TradeContext(DbContextOptions<TradeContext> options) : base(options)  
        {  
        }  
        public virtual DbSet<Trade> Trades { get; set; }    
        public virtual DbSet<Counterparty> Counterparties { get; set; }    


        protected override void OnModelCreating(ModelBuilder builder)
        {
               builder.Entity<Counterparty>().Ignore(m=>m.CounterpartyId).HasKey(m => m.Id);

               builder.Entity<Counterparty>().HasMany(c => c.Trades)
               .WithOne(e => e.Counterparty);

              
               
               base.OnModelCreating(builder);
        }
    
    }
}

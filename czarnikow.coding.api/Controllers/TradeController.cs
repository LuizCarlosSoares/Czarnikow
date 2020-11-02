using Microsoft.AspNetCore.Http;  
using Microsoft.AspNetCore.Mvc; 
using czarnikow.coding.api.data;
using czarnikow.coding.domain.entities;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;

namespace czarnicow.coding.api.controllers
{
    [Route("api/[controller]")]  
    [ApiController] 
    public class TradeController: ControllerBase
    {
       private readonly  TradeContext context;

       public TradeController(TradeContext _context) 
       {
           context = _context;
       }

       [HttpGet]  
        public async Task<IEnumerable<Trade>> Get()  
        {              
            var data = await context.Trades.Include(t=> t.Counterparty).ToListAsync();
            data.ForEach(c=> c.Counterparty.Trades = null);  
            return data;  
        }   


        [HttpGet("GetByCounterparty")]  
        public async Task<IEnumerable<Trade>> GetByCounterparty(int counterpartyId)  
        {  
            var data = await context.Trades.Include(t=> t.Counterparty)
                                           .Where(t=>t.Counterparty.Id==counterpartyId)
                                           .ToListAsync();

            data.ForEach(c=> c.Counterparty.Trades = null);  
            return data;  
        }   
           
        [HttpPost]  
        public async Task<IActionResult> Post([FromBody] Trade obj)  
        {  
            obj.Date = DateTime.Now;
            obj.Counterparty = context.Counterparties.FirstOrDefault(c=>c.Id==obj.Counterparty.Id);
            var data = await context.Trades.AddAsync(obj);  
            context.SaveChanges();  
            return Ok();  
        }  
          
        [HttpPut("{id}")]  
        public  IActionResult Put(int id, [FromBody] Trade obj)  
        {             

            var trade = context.Trades.FirstOrDefault(t=>t.Id==obj.Id);
            trade.Price = obj.Price;
            trade.Product = obj.Product;
            trade.Quantity = obj.Quantity;
            trade.Direction= obj.Direction;
            trade.Date = DateTime.Now;
            var data = context.Trades.Update(trade);  
            context.SaveChanges();       
            return Ok();            
        }  
  
          
        [HttpDelete("{id}")]  
        public IActionResult Delete(int id)  
        {  
            var data = context.Trades.Where(a => a.Id == id).FirstOrDefault();  
            context.Trades.Remove(data);  
            context.SaveChanges();  
            return Ok();  
  
        } 
    }
}
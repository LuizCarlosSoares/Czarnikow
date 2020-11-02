
using System.Collections.Generic;
using System.Threading.Tasks;
using czarnikow.coding.api.data;
using czarnikow.coding.domain.entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace czarnicow.coding.api.controllers
{
    [Route("api/[controller]")]  
    [ApiController] 
    public class CounterpartyController: ControllerBase
    {
         private readonly  TradeContext context;

         public CounterpartyController(TradeContext _context){
             context = _context;
         }
        [HttpGet]  
        public async Task<IEnumerable<Counterparty>> Get()  
        {              
            var data = await context.Counterparties.ToListAsync();                          
            return data;  
        }   

        [HttpPost]  
        public async Task<IActionResult> Post([FromBody] Counterparty obj)  
        {  
            
            var data = await context.Counterparties.AddAsync(obj);  
            context.SaveChanges();  
            return Ok();  
        }  
    }
}
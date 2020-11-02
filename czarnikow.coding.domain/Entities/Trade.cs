using System;

namespace czarnikow.coding.domain.entities
{
    public class Trade
    {

        public int Id { get; set; }
        public string Product { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public DateTime Date { get; set; }

        
        public TradeDirection Direction { get; set; }

        public Counterparty Counterparty { get; set; }

        

        
        
    }
}

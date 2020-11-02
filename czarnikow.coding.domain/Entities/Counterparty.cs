using System;
using System.Collections.Generic;

namespace czarnikow.coding.domain.entities
{
    public class Counterparty
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Trade> Trades { get; set; }

        public int CounterpartyId { get; set; }

    }
}

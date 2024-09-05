using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class InventoryDto
    {
        public int Id { get; set; }
        public string? ImageUrl { get; set; }

        public string? ItemName { get; set; }
        public int Quantity { get; set; }
        public int Defect { get; set; }
        public decimal Price { get; set; }
    }
}
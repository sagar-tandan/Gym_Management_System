using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Inventory
    {
        [Key]

        public int Id { get; set; }
        public string? ImageUrl { get; set; }

        public string? ItemName { get; set; }
        public int Quantity { get; set; }
        public int Defect { get; set; }
        public decimal Price { get; set; }
    }
}
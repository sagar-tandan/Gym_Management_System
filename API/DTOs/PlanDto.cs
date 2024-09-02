using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class PlanDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int DurationInMonths { get; set; }
        public decimal Cost { get; set; }
    }
}
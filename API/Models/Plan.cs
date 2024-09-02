using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace API.Models
{
    public class Plan
    {
        public int Id { get; set; }
        public string? Name { get; set; } // e.g., "1 Month", "3 Months", "6 Months"
        public int DurationInMonths { get; set; } // 1, 3, 6
        public decimal Cost { get; set; }

    }
}
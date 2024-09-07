using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class MemberRegistration
    {

        public int Id { get; set; }
        public int CardNo { get; set; }
        public string? MemberName { get; set; }
        public string? Contact { get; set; }
        public string? EnrolledDate { get; set; }
        public string? ExpiryDate { get; set; }
        public string? Email { get; set; }
        public decimal Price { get; set; }
        public string? PlanName { get; set; }

        // Foreign Key for Plan
        public int PlanId { get; set; }
        public Plan Plan { get; set; } // Navigation property


    }
}
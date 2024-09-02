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
        public string? FullName { get; set; }
        public string? ContactNumber { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string? Email { get; set; }


        // Foreign Key for Plan
        public int PlanId { get; set; }
        public Plan Plan { get; set; } // Navigation property


    }
}
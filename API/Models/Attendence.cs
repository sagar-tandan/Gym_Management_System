using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace API.Models
{
    public class Attendence
    {
        public int Id { get; set; } // Primary Key

        public int MemberID { get; set; } // Foreign Key to Members table
        public MemberRegistration Member { get; set; } // Navigation property to the Member

        public int CardNo { get; set; } // Card number of the member (not a foreign key, just for reference)

        public string?  Date { get; set; } // Date of attendance
        public string? Status { get; set; }
    }
}
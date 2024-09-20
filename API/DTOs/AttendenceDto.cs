using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AttendenceDto
    {
        public int Id { get; set; } // Primary Key

        public int MemberID { get; set; } 
        public int CardNo { get; set; } 
        public string? Date { get; set; } 
        public string? Status { get; set; }
    }
}
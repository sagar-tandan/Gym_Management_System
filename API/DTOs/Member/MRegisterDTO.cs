using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Member
{
    public class MRegisterDTO
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

        public int PlanId { get; set; }

    }
}
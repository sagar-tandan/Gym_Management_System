using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Member
{
    public class MRegisterDTO
    {
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string? ContactNumber { get; set; }
        public DateTime RegistrationDate { get; set; }

        public string? Email { get; set; }
        public int PlanId { get; set; }

    }
}
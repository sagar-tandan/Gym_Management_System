using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.AuthDTO
{
    public class GetAdminDto
    {
        public string? Username { get; set; }
        public string? Email { get; set; }
        public IList<string> Roles { get; set; }
    }
}
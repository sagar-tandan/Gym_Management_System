using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.AuthDTO
{
    public class NewUserDTO
    {
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Token { get; set; }
        public string? UserId { get; set; }

        public IList<string> Roles { get; set; } 
    }
}
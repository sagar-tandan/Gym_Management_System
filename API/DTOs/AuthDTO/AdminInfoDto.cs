using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.AuthDTO
{
    public class AdminInfoDto
    {
        public string? CoverPic { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? ProfilePic { get; set; }

    }
}
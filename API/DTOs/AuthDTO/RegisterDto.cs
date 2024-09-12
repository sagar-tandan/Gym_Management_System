using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.AuthDTO
{
    public class RegisterDto
    {
        [Required]
        public string? Username { get; set; }

        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }

        public string? Role { get; set; }

        public string? ProfilePic { get; set; }

        public string? CoverPic { get; set; }
    }
}
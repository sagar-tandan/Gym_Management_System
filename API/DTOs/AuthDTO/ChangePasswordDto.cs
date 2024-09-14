using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.AuthDTO
{
    public class ChangePasswordDto
    {
        public string? oldPassword { get; set; }
        public string? newPassword { get; set; }
    }
}
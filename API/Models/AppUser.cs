using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class AppUser : IdentityUser
    {
        public string? ProfilePic { get; set; }

        public string? CoverPic { get; set; }

        public string? Role { get; set; }
    }
}
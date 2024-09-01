using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class MemberRegistration
    {

        [Key]
        
        public int MemberId { get; set; }
        public string? MemberName { get; set; }

        public string? JoiningDate { get; set; }

        public string? EmailAddress { get; set; }

        public int Contact { get; set; }

        public string? Plan { get; set; }

        public float Price { get; set; }
    }
}